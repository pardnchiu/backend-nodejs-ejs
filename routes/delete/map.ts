(function () {
  let express = require('express');
  let router = express.Router();

  router.delete("/single", require("./single"));
  // router.delete("*", require("./404"));

  module.exports = router;
})();
