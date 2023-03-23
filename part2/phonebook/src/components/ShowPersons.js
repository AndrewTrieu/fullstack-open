import Person from "./Person";

const ShowPersons = ({ showedPersons, deletePerson }) => {
  return (
    <div>
      {showedPersons.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default ShowPersons;
