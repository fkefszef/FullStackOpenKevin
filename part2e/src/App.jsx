import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const weatherApiKey = '';

  const handleChange = (event) => {
    setCountryName(event.target.value);
  };

  const handleSearch = () => {
    if (countryName.trim() === '') {
      return;
    }

    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => {
        const result = response.data;
        if (result.length > 10) {
          setErrorMessage('Too many matches, please be more specific.');
          setCountries([]);
        } else if (result.length > 1) {
          setCountries(result);
          setSelectedCountry(null);
          setErrorMessage('');
        } else if (result.length === 1) {
          setSelectedCountry(result[0]);
          setCountries([]);
          setErrorMessage('');
        }
      })
      .catch((error) => {
        setCountries([]);
        setSelectedCountry(null);
        setErrorMessage('No countries found with that name.');
      });
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
    setCountries([]);
  };

  useEffect(() => {
    if (selectedCountry && selectedCountry.capital && selectedCountry.capital[0]) {
      const capital = selectedCountry.capital[0];
      
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weatherApiKey}`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          setWeather(null);
          setErrorMessage('Could not fetch weather data.');
        });
    }
  }, [selectedCountry]);

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        value={countryName}
        onChange={handleChange}
        placeholder="Search for a country"
      />
      <button onClick={handleSearch}>Search</button>
      {errorMessage && <p>{errorMessage}</p>}
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p><strong>Capital:</strong> {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}</p>
          <p><strong>Area:</strong> {selectedCountry.area} km²</p>
          <p><strong>Languages:</strong> {Object.values(selectedCountry.languages).join(', ')}</p>
          <span style={{ fontSize: '100px' }}>{selectedCountry.flag}</span>
          {selectedCountry.capital && selectedCountry.capital[0] && weather ? (
            <div>
              <p><strong>Temperature:</strong> {weather.main.temp}°F</p>
              <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
            </div>
          ) : (
            <p>Weather data not available</p>
          )}
        </div>
      )}

      {countries.length > 1 && countries.length <= 10 && (
        <div>
          <h2>Matching Countries:</h2>
          <ul>
            {countries.map((country) => (
              <li key={country.cca3}>
                {country.name.common}
                <button onClick={() => handleShowDetails(country)}>Show</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
