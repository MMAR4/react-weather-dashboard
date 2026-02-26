import React, { useState } from "react";

function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_KEY;
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      setWeather(data);
    } 
    catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Weather App</h1>

        <input type="text" placeholder="Enter City Name" value={city}
          onChange={(e) => setCity(e.target.value)}/>

        <button onClick={getWeatherData}>Search</button>

        {weather && (
          <div className="card">
            <h2 className="displayCity">{weather.name}</h2>
            <h3 className="displayTemperature">{weather.main.temp} °C</h3>
            <p className="displayWeatherCondition">
              {weather.weather[0].description}
            </p>
            <img
              className="displayWeatherIcon"
              src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        )}
      </form>
    </>
  );
}

export default App;