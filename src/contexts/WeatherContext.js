import { createContext, useState} from 'react';
import { fetchCurrentWeather, fetchForecast } from '../utils/api';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const fetchWeather = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city)
      ]);
      
      setWeatherData(current);
      setForecastData(forecast);
      
      setSearchHistory(prev => {
        const newHistory = [city, ...prev.filter(item => item !== city)];
        return newHistory.slice(0, 5);
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{
      weatherData,
      forecastData,
      loading,
      error,
      searchHistory,
      fetchWeather
    }}>
      {children}
    </WeatherContext.Provider>
  );
};