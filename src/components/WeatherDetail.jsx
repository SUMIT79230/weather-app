export default function WeatherDetails({ weather }) {
    if (!weather) return null;
  
    return (
      <div className="weather-details">
        <h3>Weather Details</h3>
        <div className="details-grid">
          <div className="detail-item">
            <span>Feels Like</span>
            <span>{Math.round(weather.main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span>Humidity</span>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span>Wind Speed</span>
            <span>{weather.wind.speed} km/h</span>
          </div>
          <div className="detail-item">
            <span>Pressure</span>
            <span>{weather.main.pressure} hPa</span>
          </div>
          <div className="detail-item">
            <span>Visibility</span>
            <span>{(weather.visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>
      </div>
    );
  }