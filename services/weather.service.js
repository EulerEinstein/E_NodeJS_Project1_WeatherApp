const getWeatherData = async (location) => {
  const params = new URLSearchParams({
    latitude: location.geometry.lat,
    longitude: location.geometry.lng,
    hourly: "temperature_2m,weather_code,is_day",
    current:
      "temperature_2m,weather_code,is_day,wind_speed_10m,wind_direction_10m",
    forecast_days: "1",
    timezone: "auto",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch weather data (status ${response.status})`
    );
  }

  return response.json();
};

module.exports = { getWeatherData };
