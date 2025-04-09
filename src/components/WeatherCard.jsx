export default function WeatherCard({ weather }) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <div className="location">
        <h2>{weather.name}</h2>
        <span className="country">{weather.sys.country}</span>
      </div>
      
      <div className="weather-main">
        <img 
          src={iconUrl} 
          alt={weather.weather[0].description} 
          className="weather-icon"
        />
        <div className="temperature">
          {Math.round(weather.main.temp)}°C
        </div>
      </div>
      
      <div className="weather-description">
        {weather.weather[0].main}
      </div>

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
        </div>
      </div>
    </div>
  );
}