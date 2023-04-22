(function () {
  let express = require('express');
  let router = express.Router();

  router.patch("/title", require("./title"));
  // router.patch("*", require("./404"));

  module.exports = router;
})();
