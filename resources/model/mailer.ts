(function () {
	function transport(path_config: string) {
		let config	: any			= require(path_config);
		let isCloud	: boolean = /cloud/.test(path_config);
		let isConfig: boolean = (
			(isCloud && (config.service && config.user && config.pass)) ||
			(!isCloud && (config.user && config.pass))
		);
		
		if (!isConfig) return;
		
		let mailer		: any = require("nodemailer");
		let transport	: any = mailer.createTransport(
			isCloud ? {
				service	: config.service,
				secure	: true,
				auth		: {
					user: config.user,
					pass: config.pass
				}
			} : {
				host	: config.host || "127.0.0.1",
				secure: config.secure,
				port	: config.port || 25,
				auth	: {
					user: config.user,
					pass: config.pass
				},
				tls: {
					rejectUnauthorized: false
				}
			}
		);

		return (body: object) => {
			transport.sendMail(body, (err: Error, info: any) => {
				if (err) throw err.message;
				console.log(info.response);
				transport.close();
			});
		};
	};

	module.exports = {
		cloud	: transport(`${__dirname}/../config/mailer/cloud.json`),
		host	: transport(`${__dirname}/../config/mailer/host.json`)
	};
}());