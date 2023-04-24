(function () {
  let minifyHTML = require("express-minify-html");
  
  module.exports = minifyHTML({
    override      : true,
    exception_url : false,
    htmlMinifier: {
      removeComments            : true,
      collapseWhitespace        : true,
      collapseBooleanAttributes : true,
      removeAttributeQuotes     : true,
      removeEmptyAttributes     : true,
      minifyJS                  : true
    }
  })
}());