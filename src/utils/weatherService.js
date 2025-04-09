import weatherData from '../data/weatherData.json';

export const getWeatherData = (cityName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const city = weatherData.cities.find(
        c => c.name.toLowerCase() === cityName.toLowerCase()
      );
      
      if (city) {
        resolve({
          ...city,
          sys: { country: city.country },
          main: {
            temp: city.temperature,
            feels_like: city.feels_like,
            humidity: city.humidity,
            pressure: city.pressure
          },
          wind: { speed: city.wind_speed },
          weather: [{
            main: city.weather.main,
            description: city.weather.description,
            icon: city.weather.icon
          }]
        });
      } else {
        reject(new Error('City not found'));
      }
    }, 800);
  });
};

export const getAvailableCities = () => {
  return weatherData.cities.map(city => city.name);
};