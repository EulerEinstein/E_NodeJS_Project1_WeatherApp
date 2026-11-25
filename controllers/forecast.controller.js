const weatherCodeImages = require("../data/weatherCodeImages.json");
const { getLatLng } = require("../services/geocode.service");
const { getWeatherData } = require("../services/weather.service");

const getWeatherCondition = (weatherCode, isDay) => {
  const conditions = weatherCodeImages[String(weatherCode)];
  const period = Number(isDay) === 0 ? "night" : "day";

  if (!conditions || !conditions[period]) {
    return { description: "Unknown", image: "" };
  }

  return conditions[period];
};

const renderForecastError = (res, error) => {
  res.render("forecast", { error });
};

const getWeatherForecast = async (req, res) => {
  const locationQuery = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (!locationQuery) {
    return renderForecastError(res, "Please enter a location name.");
  }

  try {
    const location = await getLatLng(locationQuery);

    if (!location || !location.geometry) {
      return renderForecastError(
        res,
        `No location found for "${locationQuery}". Try a different name.`
      );
    }

    const weatherData = await getWeatherData(location);

    if (!weatherData?.current || !weatherData?.hourly?.time) {
      return renderForecastError(
        res,
        "Weather data is unavailable for this location."
      );
    }

    const currentCondition = getWeatherCondition(
      weatherData.current.weather_code,
      weatherData.current.is_day
    );

    const current = {
      time: weatherData.current.time,
      temperature: weatherData.current.temperature_2m,
      windSpeed: weatherData.current.wind_speed_10m,
      windDirection: weatherData.current.wind_direction_10m,
      weatherCode: weatherData.current.weather_code,
      isDay: Number(weatherData.current.is_day) === 1,
      description: currentCondition.description,
      image: currentCondition.image,
    };

    const hourly = weatherData.hourly.time.map((time, index) => {
      const isDay = Number(weatherData.hourly.is_day?.[index]) === 1;
      const condition = getWeatherCondition(
        weatherData.hourly.weather_code[index],
        isDay ? 1 : 0
      );

      return {
        time,
        temperature: weatherData.hourly.temperature_2m[index],
        weatherCode: weatherData.hourly.weather_code[index],
        isDay,
        description: condition.description,
        image: condition.image,
      };
    });

    res.render("forecast", {
      location,
      current,
      hourly,
      error: null,
    });
  } catch (error) {
    console.error("Forecast request failed:", error);
    renderForecastError(
      res,
      "Unable to fetch the forecast right now. Please try again."
    );
  }
};

module.exports = { getWeatherForecast };
