(function () {
  let express = require('express');
  let router = express.Router();

  router.use("/", require("./get/map"));
  router.use("/", require("./post/map"));
  router.use("/", require("./put/map"));
  router.use("/", require("./patch/map"));
  router.use("/", require("./delete/map"));

  module.exports = router;
})();
