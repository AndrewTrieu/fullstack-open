import CountryData from "./CountryData";

const Countries = ({ showedCountries, setShowedCountries }) => {
  if (showedCountries.length === 1) {
    return <CountryData country={showedCountries[0]} />;
  } else if (showedCountries.length <= 10) {
    return showedCountries.map((country) => (
      <div key={country.cca3}>
        {country.name.official}
        {""}
        <button onClick={() => setShowedCountries([country])}>Show</button>
      </div>
    ));
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

export default Countries;
