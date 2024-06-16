import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./App.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "8944afa6845bd7c413a687258d3211ef";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <a
          href="https://juliana-portfolio-web.netlify.app"
          target="_blank"
          rel="noopener noreferrer">
          <img
            className="logo image-fluid"
            src="/image/MyLogo1.png"
            class="logo"
            alt="Juliana Logo"
          />
        </a>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input type="submit" value="Search" className="btn" />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast
          coordinates={weatherData.coordinates}
          city={weatherData.city}
        />
        <footer>
          This project was coded by{" "}
          <a
            href="https://github.com/JulianaBurakova"
            target="_blank"
            rel="noopener noreferrer">
            Iuliana Burakova
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/JulianaBurakova/react-weather-app"
            target="_blank"
            rel="noopener noreferrer">
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://juliana-react-weather.netlify.app"
            target="_blank"
            rel="noopener noreferrer">
            hosted on Netlify
          </a>
        </footer>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
