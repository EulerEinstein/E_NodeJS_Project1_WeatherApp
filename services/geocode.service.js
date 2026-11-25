require("dotenv").config();

const getLatLng = async (query) => {
  const apiKey = process.env.OPENCAGE_API_KEY;
  const apiUrl = "https://api.opencagedata.com/geocode/v1/json";

  if (!apiKey) {
    throw new Error("Geocoding API key is not configured");
  }

  const requestUrl =
    apiUrl +
    "?key=" +
    apiKey +
    "&q=" +
    encodeURIComponent(query) +
    "&pretty=1" +
    "&no_annotations=1";

  const response = await fetch(requestUrl);

  if (response.ok) {
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0];
    }

    return null;
  }

  if (response.status <= 500) {
    const data = await response.json().catch(() => ({}));
    const message = data.status?.message || "Unable to geocode that location";
    throw new Error(message);
  }

  throw new Error(`Geocoding server error: ${response.status}`);
};

module.exports = { getLatLng };
