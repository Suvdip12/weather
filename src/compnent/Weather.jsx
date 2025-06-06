import React, { useEffect, useState } from 'react'
import './Weather.css'
import weathericon from '../assets/cloud.png'
import clearicon from '../assets/clear.png'
import drizzleicon from '../assets/drizzle.png'
import rainicon from '../assets/rain.png'
import snowicon from '../assets/snow.png'
import windicon from '../assets/wind.png'
import humidityicon from '../assets/humidity.png'

const allicons = {
  "01d": clearicon,
  "01n": clearicon,
  "02d": weathericon,
  "02n": weathericon,
  "03d": weathericon,
  "03n": weathericon,
  "04d": drizzleicon,
  "04n": drizzleicon,
  "09d": rainicon,
  "09n": rainicon,
  "10d": rainicon,
  "10n": rainicon,
  "13d": snowicon,
  "13n": snowicon,
}

const Weather = () => {
  const [weatherdata, setWeatherdata] = useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    city: '',
    weather: clearicon,
  });
  const [city, setCity] = useState('Kalyani');
  const [input, setInput] = useState('');

  const search = async (searchCity = city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=0068952caf2c11092cbfc7167605cb31`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allicons[data.weather[0].icon] || weathericon;
      setWeatherdata({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        city: data.name,
        weather: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (input.trim() !== '') {
      setCity(input);
      search(input);
    }
  };

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={handleInputChange}
          onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
        />
        <img
          src="https://img.icons8.com/ios-filled/50/000000/search.png"
          alt="search-icon"
          onClick={handleSearch}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <img src={weatherdata.weather} className='weather-icon' alt="weather" />
      <p className='tempreture'>{weatherdata.temperature}°c</p>
      <p className='city'>{weatherdata.city}</p>
      <div className="weather-data">
        <div className="colom">
          <img src={humidityicon} alt="humidity" />
          <div>
            <p className='value'>{weatherdata.humidity}</p>
            <span className='data'>Humidity</span>
          </div>
        </div>
        <div className="colom">
          <img src={windicon} alt="wind" />
          <div>
            <p className='value'>{weatherdata.windSpeed}KM/H</p>
            <span className='data'>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
