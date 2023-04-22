(function () {
  let express = require('express');
  let router = express.Router();

  router.get("/", require("./index"));
  // router.get("*", require("./404"));

  module.exports = router;
})();
