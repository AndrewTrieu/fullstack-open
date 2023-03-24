import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [showedCountries, setShowedCountries] = useState([]);

  const CountryData = ({ country }) => {
    return (
      <div>
        <h1>{country.name.official}</h1>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area} km²</div>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
      </div>
    );
  };

  const Countries = ({ showedCountries }) => {
    const [country, setCountry] = useState("");
    if (showedCountries.length === 1) {
      return <CountryData country={showedCountries[0]} />;
    } else if (showedCountries.length <= 10) {
      return (
        <div>
          {showedCountries.map((country) => (
            <div key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => setCountry(country)}>show</button>
            </div>
          ))}
          {country && <CountryData country={country} />}
        </div>
      );
    } else if (showedCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleQueryChange = (event) => {
    const search = event.target.value;
    setQuery(search);
    setShowedCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div>
        Find countries <input value={query} onChange={handleQueryChange} />
      </div>
      <Countries showedCountries={showedCountries} />
    </div>
  );
};

export default App;
