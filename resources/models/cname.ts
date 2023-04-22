(function () {
  var cname = require(`${__dirname}/../config/cname.js`);
  var domain = process.env.DOMAIN;

  module.exports = (req: any, res: any, next: () => void) => {
    var url: string = req.headers.origin;
    var urls: string[] = [
      `http://${domain}`,
      `https://${domain}`
    ];
    
    cname.forEach((e: string) => {
      urls.push(`http://${e}.${domain}`);
      urls.push(`https://${e}.${domain}`);
    });
    
    if (urls.indexOf(url) !== -1) res.setHeader("Access-Control-Allow-Origin", url);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    
    next();
  };
}());