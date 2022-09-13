import React from "react";
import { useState } from "react";
import "./weather.css";
import Navbar from "../../layouts/Navbar/navbar";
import moment from "moment";

const Weather = () => {
  const APP_ID = "18e2c48fbab5a275887a09a1a037bedd";
  const DEFAULT_VALUE = "Chưa cập nhật";

  const [input, setInput] = useState("");
  const [cityName, setCity] = useState("");
  const [weatherState, setWeatherState] = useState("");
  const [weatherIconSrc, setWeatherIconSrc] = useState("");
  const [temprature, setTemprature] = useState("");

  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  // "http://openweathermap.org/img/wn/10d@2x.png"

  const handleKeyPress = (event) => {
    console.log(event.key);
  } 
  const handleSubmit = () => {
    console.log("test");
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APP_ID}&units=metric&lang=vi`
    // ).then(async (res) => {
    //   const data = await res.json();
    //   console.log(`[search input]`, data);
    //   if(data.cod == 200) {
    //     setCity(data.name || DEFAULT_VALUE);
    //     setWeatherState(data.weather[0].description || DEFAULT_VALUE);
    //     setWeatherIconSrc(
    //       `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    //     );
    //     setTemprature(Math.round(data.main.temp) || DEFAULT_VALUE);
    //     setSunrise(moment.unix(data.sys.sunrise) || DEFAULT_VALUE);
    //     setSunset(moment.unix(data.sys.sunset) || DEFAULT_VALUE);
    //     setWindSpeed((data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE);
    //     setHumidity(data.main.humidity || DEFAULT_VALUE);
    //   } else {
    //     setCity(DEFAULT_VALUE);
    //     setWeatherState(DEFAULT_VALUE);
    //     setWeatherIconSrc(
    //       `http://openweathermap.org/img/wn/10d@2x.png`
    //     );
    //     setTemprature(Math.round(DEFAULT_VALUE));
    //     setSunrise(moment.unix(DEFAULT_VALUE));
    //     setSunset(moment.unix(DEFAULT_VALUE));
    //     setWindSpeed((DEFAULT_VALUE));
    //     setHumidity(DEFAULT_VALUE);
    //   }
    // });
  };



  return (
    <>
      <Navbar />
      <div className="container-weather">
        <div className="main-section">
          <div className="search-bar">
            <i className="fa fa-search"></i>
            <input
              type="text"
              value={input}
              id="search-input"
              placeholder="Tìm kiếm thành phố"
              onKeyDown={handleKeyPress}
            ></input>
          </div>
          <div className="infor-wrapper">
            <p className="city-name">{cityName}</p>
            <p className="weather-state">{weatherState}</p>
            <img
              src={weatherIconSrc}
              alt="weather-icon"
              className="weather-icon"
            ></img>
            <p className="temprature">{temprature}</p>
          </div>
        </div>
        <div className="additional-section">
          <div className="row">
            <div className="item">
              <div className="label">Mặt trời mọc</div>
              <div className="value sunrise">{sunrise}</div>
            </div>
            <div className="item">
              <div className="label">Mặt trời lặn</div>
              <div className="value sunset">{sunset}</div>
            </div>
          </div>
          <div className="row">
            <div className="item">
              <div className="label">Độ ẩm</div>
              <div className="value">
                {" "}
                <span className="humidity">{humidity}</span>%
              </div>
            </div>
            <div className="item">
              <div className="label">Tốc độ gió</div>
              <div className="value">
                <span className="wind-speed">{windSpeed}</span> km/h
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
