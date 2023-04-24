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
    secret  : "rzSAscktkQTV5SmCbt2bkP6Bxn9n2DyPSxsVVzWU4ER4XZRpM5cEBmxBQdT4hrZztWqAGxFGe2bfytvqGbVEqdRSbctquKrQ2QbutF2eY9azGScZpDzmfpNMXExK9XDK",
    resave  : true,
    expires : new Date(Date.now() + expires),
    saveUninitialized: true,
    cookie: {
      domain  : `.${process.env.DOMAIN}`,
      httpOnly: true,
      maxAge  : expires,
    }
  });
}());
