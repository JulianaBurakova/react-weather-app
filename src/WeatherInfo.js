import React, { useState, useEffect } from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo(props) {
  let [temperature, setTemperature] = useState(props.data.temperature);
  let [unit, setUnit] = useState("Celsius");

  useEffect(() => {
    setTemperature(props.data.temperature);
  }, [props.data.temperature]);

  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("Fahrenheit");
    setTemperature(Math.round((props.data.temperature * 9) / 5 + 32));
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("Celsius");
    setTemperature(props.data.temperature);
  }

  return (
    <div className="WeatherInfo mb-5">
      <div className="row">
        <div className="col-6">
          <h1>{props.data.city}</h1>
          <ul>
            <li>
              <FormattedDate date={props.data.date} />,
              <span className="text-capitalize"> {props.data.description}</span>
            </li>
            <li>
              Humidity: <strong>{props.data.humidity}%</strong>, Wind:{" "}
              <strong>{props.data.wind} km/h</strong>
            </li>
          </ul>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-8">
          <div className="temperature-container d-flex justify-content-end">
            <WeatherIcon code={props.data.icon} size={72} />
            <div>
              <span className="temperature">{Math.round(temperature)}</span>
              <span className="unit">
                {unit === "Celsius" ? (
                  <>
                    °C{" "}
                    <a href="/" onClick={showFahrenheit} className="linkStyle">
                      | °F
                    </a>
                  </>
                ) : (
                  <>
                    <a href="/" onClick={showCelsius} className="linkStyle">
                      °C |
                    </a>{" "}
                    °F
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
