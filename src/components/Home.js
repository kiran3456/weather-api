import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { secrets } from "../secret/secret.js";
import "./Home.css";
import * as AiIcons from "react-icons/ai";

function Home() {
  const [data, setdata] = useState({
    celcius: 10,
    name: "london",
    humidity: 10,
    speed: 2,
    image: "/images/clouds.jpg",
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${secrets.api_key}&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main == "Clouds") {
            imagePath = "/images/clouds.jpg";
          } else if (res.data.weather[0].main == "Rain") {
            imagePath = "/images/rain.jpg";
          } else if (res.data.weather[0].main == "Drizzle") {
            imagePath = "/images/drizzle.jpg";
          } else if (res.data.weather[0].main == "Clear") {
            imagePath = "/images/clear.jpg";
          } else if (res.data.weather[0].main == "Mist") {
            imagePath = "/images/mist.jpg";
          } else if (res.data.weather[0].main == "Fog") {
            imagePath = "/images/snow.png";
          } else {
            imagePath = "/images/clouds.jpg";
          }
          console.log("Data", res.data);
          console.log("Info: ", res.data.weather[0].main);
          setdata({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <AiIcons.AiOutlineSearch size={30} onClick={handleClick} />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={data.image} alt="" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col1">
              <img src="/images/humandity.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col2">
              <img src="/images/wind.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)}km/h</p>
                <p>wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
