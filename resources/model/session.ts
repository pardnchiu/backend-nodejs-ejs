(function () {
  let session : any     = require("express-session");
  let redis   : any     = require("redis");
  let config  : any     = require(`${__dirname}/../config/session/redis.json`);
  let expires : number  = 60 * 60 * 24 * 30 * 1000;
  let store   : any;

  config.host ? (() => {
    let connect : any = require("connect-redis")(session);
    let client  : any = redis.createClient({
      host: config.host,
      port: config.port || 6379,
      db  : config.db || 0,
    });
    store = new connect({
      client: client
    });
  })() : (() => {
    var fileStore: any = require("session-file-store")(session);
    store = new fileStore({
      path: `${__dirname}/../../storage/session`,
      ttl : expires,
    });
  })();
  
  module.exports = session({
    store   : store,
    secret  : "mOVocLFNX31kioLY6K4wZcRQD3E1KR",
    expires : new Date(Date.now() + expires),
    resave  : false,
    cookie  : {
      domain  : `.${process.env.DOMAIN}`,
      httpOnly: true,
      maxAge  : expires,
    },
    saveUninitialized: false,
  });
}());
