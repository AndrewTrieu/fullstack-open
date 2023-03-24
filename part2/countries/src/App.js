import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [showedCountries, setShowedCountries] = useState([]);

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
