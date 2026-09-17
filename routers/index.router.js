const { Router } = require("express");
const { getIndexPage } = require("../controllers/index.controller");

const router = Router();

router.route("/").get(getIndexPage);

module.exports = router;