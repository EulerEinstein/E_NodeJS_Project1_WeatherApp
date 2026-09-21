Weather App 🌤️

A simple weather application built with Express.js and EJS. Users can search for a location and view its current weather and hourly forecast.

Features

Search for a location

Get location coordinates using the OpenCage API

Get current and hourly weather using the Open-Meteo API

Display weather information using EJS templates

Built With

Node.js

Express.js

EJS

OpenCage API

Open-Meteo API

Getting Started
Installation
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install


Create a .env file and add your OpenCage API key:

OPENCAGE_API_KEY=your_api_key_here


Then start the application:

npm start

How It Works

User searches for a location.

OpenCage converts the location into latitude and longitude.

The coordinates are sent to Open-Meteo.

Weather data is retrieved and displayed using an EJS template.

Learning Goals

This project was created to practice:

Express.js and controllers

Working with APIs

Managing API keys and environment variables

EJS templating

Integrating third-party services
