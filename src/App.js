import { useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import RecentSearches from './components/RecentSearches';
import Loader from './components/Loader';

import { getWeatherData, getAvailableCities } from './utils/weatherService';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [availableCities] = useState(getAvailableCities());

  const fetchWeather = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getWeatherData(city);
      setWeather(data);
      setRecentSearches(prev => {
        const newSearches = [city, ...prev.filter(item => item.toLowerCase() !== city.toLowerCase())];
        return newSearches.slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header>
          <h1>Weather Dashboard</h1>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <SearchBar 
          onSearch={fetchWeather} 
          availableCities={availableCities} 
        />

        {loading && <Loader />}

        {error && <div className="error-message">{error}</div>}

        {weather && !loading && (
  <WeatherCard weather={weather} />
)}

        {recentSearches.length > 0 && (
          <RecentSearches 
            searches={recentSearches} 
            onSearch={fetchWeather} 
          />
        )}
      </div>
    </div>
  );
}

export default App;