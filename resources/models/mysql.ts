(function () {
	exports.read = createPool(`${__dirname}/../config/mysql/read.json`);
	exports.write = createPool(`${__dirname}/../config/mysql/write.json`);

	function createPool(path_config: string) {
		var mysql = require("mysql");
		var config = require(path_config);
		var pool: any;

		if (config.database) pool = mysql.createPool({
			port: config.port || 3306,
			host: config.host || "127.0.0.1",
			user: config.user || "root",
			password: config.password || "",
			database: config.database,
			charset: config.charset || "utf8mb4",
			connectionLimit: config.connectionLimit || 8,
			useConnectionPooling: true
		});

		return (sql: any, options: any, callback: any) => {
			if (!config.database) return console.log("提醒: 請設定 mysql config.");

			if (typeof options === "function") {
				callback = options;
				options = undefined;
			};

			pool.getConnection((err: Error, connection: any) => {
				if (err) return callback(err, null, null);
				connection.query(sql, options, (err: Error, results: any, fields: any) => {
					if (err) return connection.rollback(() => callback(err, null, null), connection.release());
					connection.commit(function (err: Error) {
						if (err) return connection.rollback(() => callback(err, null, null), connection.release());
						callback(err, results, fields);
						connection.release();
					});
				});
			});
		};
	};
}());