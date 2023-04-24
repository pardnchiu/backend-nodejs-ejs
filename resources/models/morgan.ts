(function(){
  let morgan = require("morgan");

  module.exports = morgan(`:status :method :url - :response-time ms`, {
    skip: (req: any, res: any) => req.method === "GET" //req.originalUrl.startsWith("/img"); 
  });
}());