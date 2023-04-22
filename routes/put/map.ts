(function () {
  let express = require('express');
  let router = express.Router();

  router.put("/updated", require("./updated"));
  // router.put("*", require("./404"));

  module.exports = router;
})();
