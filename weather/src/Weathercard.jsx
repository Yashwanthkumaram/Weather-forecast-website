import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const { main, weather, wind, dt } = weatherData;
  const date = new Date(dt * 1000);

  return (
    <div className="weather-card">
      <h2>{weather[0].description}</h2>
      <div className="weather-info">
        <div className="info-item">
          <span className="info-label">Temperature:</span>
          <span className="info-value">{main.temp}°C</span>
        </div>
        <div className="info-item">
          <span className="info-label">Humidity:</span>
          <span className="info-value">{main.humidity}%</span>
        </div>
        <div className="info-item">
          <span className="info-label">Wind Speed:</span>
          <span className="info-value">{wind.speed} m/s</span>
        </div>
        <div className="info-item">
          <span className="info-label">Date and Time:</span>
          <span className="info-value">{date.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
