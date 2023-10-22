import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './Weathercard';
import WeatherChart from './WeatherChart';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'bf6eeed6d9c75740f3ab9d46bcd69a6d';

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      const currentWeather = response.data;
      const forecastWeather = forecastResponse.data;

      setWeatherData(currentWeather);

      const labels = [];
      const temperatureData = [];
      const humidityData = [];

      forecastWeather.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        labels.push(date.toLocaleDateString());
        temperatureData.push(item.main.temp);
        humidityData.push(item.main.humidity);
      });

      setChartData({ labels, temperature: temperatureData, humidity: humidityData });
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setChartData(null);
      setError('City not found. Please enter a valid city name.');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <div className="error">{error}</div>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {chartData && <WeatherChart chartData={chartData} />}
    </div>
  );
}

export default App;
