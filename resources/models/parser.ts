(function () {
  let body    = require("body-parser");
  let cookie  = require("cookie-parser");

  module.exports = {
    json  : body.json(),
    body  : body.urlencoded({ extended: false }),
    cookie: cookie("1Qa0UPB4gleoIVGYCFi4AOKmHxnLGc")
  };
}());