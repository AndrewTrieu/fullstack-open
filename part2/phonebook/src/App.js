import { useState, useEffect } from "react";
import personService from "./services/personService";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import ShowPersons from "./components/ShowPersons";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [showedPersons, setShowedPersons] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setShowedPersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const addPerson = (event) => {
    event.preventDefault();
    const personExists = persons.find(
      (person) => person.name === newPerson.name
    );
    if (personExists) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...personExists, number: newPerson.number };
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : returnedPerson
              )
            );
            setShowedPersons(
              showedPersons.map((person) =>
                person.id !== updatedPerson.id ? person : returnedPerson
              )
            );
            setMessage(`Updated ${returnedPerson.name}`);
          })
          .catch((error) => {
            setMessage(
              `Information of ${updatedPerson.name} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== updatedPerson.id)
            );
            setShowedPersons(
              showedPersons.filter((person) => person.id !== updatedPerson.id)
            );
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setShowedPersons(showedPersons.concat(returnedPerson));
          setMessage(`Added ${returnedPerson.name}`);
        })
        .catch((error) => {
          setMessage(error.response.data.error);
        });
    }
    setNewPerson({ name: "", number: "" });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then((response) => {
        const newPersons = persons.filter((person) => person.id !== id);
        setPersons(newPersons);
        setShowedPersons(newPersons);
      });
    }
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
      <Message message={message} />
      <Filter filter={filter} filterByName={filterByName} />
      <h2>Add a new number</h2>
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <ShowPersons showedPersons={showedPersons} deletePerson={deletePerson} />
    </div>
  );
};
export default App;
