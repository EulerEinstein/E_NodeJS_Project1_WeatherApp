# Weather App 🌤️

A simple weather application built with Express.js and EJS. Users can search for a location and view its current weather and hourly forecast.

## Features

- Search for a location
- Get location coordinates using the OpenCage API
- Get current and hourly weather using the Open-Meteo API
- Display weather information using EJS templates

## Screenshots
### Search Page
<img width="474" height="200" alt="Weather app search page" src="https://github.com/user-attachments/assets/a8645523-a517-4580-a8ea-367304c43a49" />

### Forecast Page
<img width="474" height="428" alt="Weather app forecast page" src="https://github.com/user-attachments/assets/4a1524c7-6848-4a82-b808-79057393979b" />

## Built With

- Node.js
- Express.js
- EJS
- OpenCage API
- Open-Meteo API

## Getting Started

### Installation

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
```

Create a .env file and add your OpenCage API key:
```bash
OPENCAGE_API_KEY=your_api_key_here
```

Start the application:
```bash
npm start
```

## How It Works
The user searches for a location, which is first sent to the OpenCage API to obtain its coordinates. These coordinates are then used with the Open-Meteo API to retrieve the current and hourly weather data.

The weather information is then displayed using EJS templates.

## Learning Goals
This project was built to practice:
- Express.js controllers
- API integration
- Environment variables and API keys
- EJS templating
- Working with third-party services
