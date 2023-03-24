import { useState } from "react";
import CountryData from "./CountryData";

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

export default Countries;
