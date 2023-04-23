(function () {
  var config = require(`${__dirname}/../config/session/redis.json`);
  var express_session = require("express-session");
  var redis = require("redis");
  var RedisStore = require("connect-redis")(express_session);
  var client = redis.createClient({
    host: config.host,
    port: config.port,
    db: config.db,
  });
  module.exports = express_session({
    store: new RedisStore({ client: client }),
    secret: "rzSAscktkQTV5SmCbt2bkP6Bxn9n2DyPSxsVVzWU4ER4XZRpM5cEBmxBQdT4hrZztWqAGxFGe2bfytvqGbVEqdRSbctquKrQ2QbutF2eY9azGScZpDzmfpNMXExK9XDK",
    resave: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
    saveUninitialized: true,
    cookie: {
      domain: `.${process.env.DOMAIN}`,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 * 1000,
    },
  });
}());
