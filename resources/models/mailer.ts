(function () {
	let mailer = require("nodemailer");
	
	function createTransport(path_config: string) {
		let config = require(path_config);

		let transport	: any;
		let isCloud 	: boolean = /cloud/.test(path_config);
		let isConfig	: boolean	= (
			(isCloud && (config.service && config.user && config.pass)) ||
			(!isCloud && (config.user && config.pass))
		);

		if (isConfig) transport = mailer.createTransport(
			isCloud ? {
				service	: config.service,
				secure	: true,
				auth: {
					user: config.user,
					pass: config.pass
				}
			} : {
				host	: config.host || "127.0.0.1",
				secure: config.secure,
				port	: config.port || 25,
				auth: {
					user: config.user,
					pass: config.pass
				},
				tls: {
					rejectUnauthorized: false
				},
			}
		);
		
		return (body: object) => {
			if (!isConfig) throw "提醒: 請設定 mailer config.";
			transport.sendMail(body, (err: Error, info: any) => {
				if (err) return console.error(err.message);
				console.log(info.response);
				transport.close();
			});
		};
	};

	module.exports = {
		cloud	: createTransport(`${__dirname}/../config/mailer/cloud.json`),
		host	: createTransport(`${__dirname}/../config/mailer/host.json`)
	};
}());