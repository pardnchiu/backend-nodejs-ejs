(function () {
  var bodyParser = require("body-parser");
  var cookieParser = require("cookie-parser");
  exports.json = bodyParser.json();
  exports.body = bodyParser.urlencoded({ extended: false });
  exports.cookie = cookieParser("24924502");
}());