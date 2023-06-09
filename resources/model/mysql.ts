(function () {
	function pool(path_config: string) {
		let config: any = require(path_config);
		
		if (!config.database) return;

		let mysql	: any = require("mysql");
		let pool	: any = mysql.createPool({
			port		: config.port || 3306,
			host		: config.host || "127.0.0.1",
			user		: config.user || "root",
			password: config.password || "",
			database: config.database,
			charset	: config.charset || "utf8mb4",
			connectionLimit: config.connectionLimit || 8,
			useConnectionPooling: true
		});
		
		return (sql: string, options: any, callback: any) => {
			if (typeof options === "function") (callback = options, options = undefined);
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

	module.exports = {
		read	: pool(`${__dirname}/../config/mysql/read.json`),
		write	: pool(`${__dirname}/../config/mysql/write.json`)
	};
}());