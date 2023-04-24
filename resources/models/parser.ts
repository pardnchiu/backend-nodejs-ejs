(function () {
  let body    = require("body-parser");
  let cookie  = require("cookie-parser");
  
  exports.json    = body.json();
  exports.body    = body.urlencoded({ extended: false });
  exports.cookie  = cookie("24924502");
}());