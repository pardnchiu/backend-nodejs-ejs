(function () {
  let minify: any = require("express-minify-html");
  
  module.exports = minify({
    override      : true,
    exception_url : false,
    htmlMinifier  : {
      removeComments            : true,
      collapseWhitespace        : true,
      collapseBooleanAttributes : true,
      removeAttributeQuotes     : true,
      removeEmptyAttributes     : true,
      minifyJS                  : true
    }
  });
}());