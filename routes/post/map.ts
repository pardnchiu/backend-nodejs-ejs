(function () {
  let express = require('express');
  let router = express.Router();

  router.post("/add", require("./add"));
  // router.post("*", require("./404"));

  module.exports = router;
})();
