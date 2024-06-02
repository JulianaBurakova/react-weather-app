import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Weather() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({});
  let [loaded, setLoaded] = useState(false);

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  function updateSearch(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="Weather">
      <form onSubmit={handleSearch}>
        <div className="row">
          <div className="col-9 ">
            <input
              type="search"
              placeholder="Enter a city..."
              onChange={updateSearch}
            />
          </div>
          <div className="col-3 p-0">
            <button type="submit">Search</button>
          </div>
        </div>
      </form>
      <footer>
        This project was coded by{" "}
        <a
          href="https://github.com/JulianaBurakova"
          target="_blank"
          rel="noreferrer">
          Iuliana Burakova
        </a>{" "}
        and is{" "}
        <a
          href="https://github.com/JulianaBurakova/react-weather-app"
          target="_blank"
          rel="noreferrer">
          open-sourced on GitHub
        </a>{" "}
        and{" "}
        <a
          href="https://juliana-react-weather.netlify.app"
          target="_blank"
          rel="noreferrer">
          hosted on Netlify
        </a>
      </footer>
    </div>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>City: {city}</li>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind Speed: {weather.wind} km/h</li>
          <li>
            {" "}
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
