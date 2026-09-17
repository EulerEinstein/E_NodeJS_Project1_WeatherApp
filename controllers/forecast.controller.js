require("dotenv").config();
const weatherCodeImages = require("../data/weatherCodeImages.json");

const getWeatherForecast = async (req,res) => {

    
    const locationQuery = req.query.q

    let location = await getLatLng(locationQuery);

    let weatherData = await getweatherData(location);
    
    // Store current weather data
    const current = weatherData.current;
    // Create an hourly forecast array
    const hourly = weatherData.hourly.time.map((time, index) => ({
        time: time,
        temperature: weatherData.hourly.temperature_2m[index],
        weatherCode: weatherData.hourly.weather_code[index]
    }));

    // Send the data back to your client
    //res.json(weatherData);
    res.render("forecast", {
      location,
      current,
      hourly,
      weatherCodeImages,
      error: null
    });

};

async function getLatLng(reqQuery) {

    /****************************************
     openCage API 
    ***************************************/ 
    
    const api_key = process.env.OPENCAGE_API_KEY;
    const query = reqQuery;
    const api_url = 'https://api.opencagedata.com/geocode/v1/json';
    let location;

    const request_url = api_url
        + '?key=' + api_key
        + '&q=' + encodeURIComponent(query)
        + '&pretty=1'
        + '&no_annotations=1';

    try {
        const response = await fetch(request_url);

        if (response.ok) {
            // Success!
            const data = await response.json();

            if (data.results && data.results.length > 0) {

                location = data.results[0];
                console.log(location.formatted, location.geometry.lat, location.geometry.lng);

                return location;
            } else {
                console.log('No results found.');
            }

        } else if (response.status <= 500) {
            // We reached the server, but it returned an error
            const data = await response.json();

            console.log('Unable to geocode! Response code: ' + response.status);
            console.log('Error msg: ' + data.status.message);
        } else {
            console.log('Server error: ' + response.status);
        }
    } catch (error) {
        // Connection/network error
        console.log('Unable to connect to server:', error);
    }

}

async function getweatherData (location) {
    /****************************************
     openMeteo API
        ***************************************/ 

    
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.geometry.lat}&longitude=${location.geometry.lng}&hourly=temperature_2m,weather_code&current=temperature_2m,wind_speed_10m,wind_direction_10m&forecast_days=1&timezone=auto`);
        
        // Check if the external response was successful
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch external data' });
        }

        const weatherData = await response.json();
        
        return weatherData;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


module.exports = { getWeatherForecast };