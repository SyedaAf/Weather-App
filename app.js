
let unit = 'metric'; // Default unit is 'metric' for Celsius
let currentTemperatureInCelsius = null;

// Function to get weather data
async function getWeather() {
const city = document.getElementById("city").value;
const apiKey = "df593b7fb74e80356d67edf1c8c500b6"; // Replace with your OpenWeatherMap API Key
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

const errorMessage = document.getElementById("error-message");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const humidityElement = document.getElementById("humidity");
const locationElement = document.getElementById("location");

// Reset previous error or data
errorMessage.innerText = '';
temperatureElement.innerText = '';
descriptionElement.innerText = '';
humidityElement.innerText = '';
locationElement.innerText = '';


try {
const response = await fetch(url);
if (!response.ok) {
throw new Error("City not found");
}
const data = await response.json();

// Store the temperature in Celsius for future conversion
currentTemperatureInCelsius = data.main.temp;

const temperature = unit === 'metric'
? currentTemperatureInCelsius // Celsius
: convertToFahrenheit(currentTemperatureInCelsius); // Fahrenheit
const description = data.weather[0].description;
const humidity = data.main.humidity;

temperatureElement.innerText = `Temperature: ${temperature}°${unit === 'metric' ? 'C' : 'F'}`;
descriptionElement.innerText = `Weather: ${description}`;
humidityElement.innerText = `Humidity: ${humidity}%`;
locationElement.innerText = `${city}`;
} catch (error) {
errorMessage.innerText = `Error: ${error.message}`;
}
}

// Convert Celsius to Fahrenheit
function convertToFahrenheit(celsius) {
return (celsius * 9/5) + 32;
}

// Toggle between Celsius and Fahrenheit
function toggleUnit() {
if (unit === 'metric') {
unit = 'imperial'; // Switch to Fahrenheit
document.getElementById("unit-toggle").innerText = "Switch to °C"
} else {
unit = 'metric'; // Switch to Celsius
document.getElementById("unit-toggle").innerText = "Switch to °F"
}

// After toggling the unit, re-fetch the weather data
getWeather();
}