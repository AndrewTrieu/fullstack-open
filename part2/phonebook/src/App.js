import { useState, useEffect } from "react";
import personService from "./services/personService.js";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import ShowPersons from "./components/ShowPersons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [showedPersons, setShowedPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setShowedPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setShowedPersons(persons.concat(returnedPerson));
      setNewPerson({ name: "", number: "" });
    });
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
