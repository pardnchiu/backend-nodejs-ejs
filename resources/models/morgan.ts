(function(){
  var morgan = require("morgan");
  module.exports = morgan(`:status :method :url - :response-time ms`, {
    skip: (req: any, res: any) => {
      return req.method === "GET" //req.originalUrl.startsWith("/img"); 
    }
  });
}());