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
      <a
        href="https://juliana-portfolio-web.netlify.app"
        target="_blank"
        rel="noopener noreferrer">
        <img
          className="image-fluid"
          src="/image/MyLogo1.png"
          class="logo"
          width={150}
          alt="Juliana Logo"
        />
      </a>
      <form onSubmit={handleSearch}>
        <div className="row">
          <div className="col-9 ">
            <input
              type="search"
              placeholder="Enter a city..."
              className="form-control"
              onChange={updateSearch}
            />
          </div>
          <div className="col-3 p-0">
            <button type="submit">Search</button>
          </div>
        </div>
      </form>
      <div className="row mt-5">
        <div className="col-6">
          <h1>Paris</h1>
          <ul>
            <li>
              <span>Sunday 18:52</span>, few clouds
            </li>
            <li>
              Humidity: <strong>78%</strong>, Wind: <strong>12.07km/h</strong>
            </li>
          </ul>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-8">
          <div class="temperature-container d-flex justify-content-end">
            <img
              id="dimg_15"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII="
              class="weather-img"
              alt="Partly sunny"
            />
            <div>
              <span class="temperature">16</span>
              <span class="unit">°C |°F</span>
            </div>
          </div>
        </div>
      </div>
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
