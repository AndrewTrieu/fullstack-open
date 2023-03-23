import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import ShowPersons from "./components/ShowPersons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [showedPersons, setShowedPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setShowedPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newPerson));
    setShowedPersons(persons.concat(newPerson));
    setNewPerson({ name: "", number: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const filterByName = (event) => {
    const search = event.target.value;
    setFilter(search);
    setShowedPersons(
      persons.filter((person) => person.name.toLowerCase().includes(search))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterByName={filterByName} />
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <ShowPersons showedPersons={showedPersons} />
    </div>
  );
};
export default App;
