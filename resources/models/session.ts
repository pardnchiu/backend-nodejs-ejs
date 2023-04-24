(function () {
  let session = require("express-session");
  let redis   = require("redis");
  let connect = require("connect-redis")(session);
  let config  = require(`${__dirname}/../config/session/redis.json`);

  let expires = 60 * 60 * 24 * 30 * 1000;
  let client  = redis.createClient({
    host: config.host,
    port: config.port,
    db  : config.db,
  });
  
  module.exports = session({
    store   : new connect({ client: client }),
    secret  : "mOVocLFNX31kioLY6K4wZcRQD3E1KR",
    expires : new Date(Date.now() + expires),
    resave  : true,
    cookie  : {
      domain  : `.${process.env.DOMAIN}`,
      httpOnly: true,
      maxAge  : expires,
    },
    saveUninitialized: true,
  });
}());
