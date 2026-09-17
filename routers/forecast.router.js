const { Router } = require("express");
const { getWeatherForecast } = require("../controllers/forecast.controller");

const router = Router();

router.route("/").get(getWeatherForecast);

module.exports = router;