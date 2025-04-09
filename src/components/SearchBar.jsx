import { useState } from 'react';

export default function SearchBar({ onSearch, availableCities }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = availableCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query && availableCities.includes(query)) {
      onSearch(query);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    onSearch(city);
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          aria-label="Search for a city"
        />
        <button type="submit" className="search-button">
          Search
        </button>
        
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((city, index) => (
              <li 
                key={index} 
                onClick={() => handleSuggestionClick(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}