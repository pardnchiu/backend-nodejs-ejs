(function () {
  let cors: any = require(`${__dirname}/../config/cors.json`);

  module.exports = (req: any, res: any, next: () => void) => {
    let url : string    = req.headers.origin;
    let urls: string[]  = [];

    cors.forEach((e: string) => {
      let domain: string = e.replace(/https?/, "");
      urls.push(`http://${domain}`);
      urls.push(`https://${domain}`);
    });
    
    if (urls.indexOf(url) !== -1) res.setHeader("Access-Control-Allow-Origin", url);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
  };
}());