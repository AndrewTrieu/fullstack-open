import Person from "./Person";

const ShowPersons = ({ showedPersons }) => {
  return (
    <div>
      {showedPersons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default ShowPersons;
