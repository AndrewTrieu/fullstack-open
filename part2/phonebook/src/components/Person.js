const Person = ({ person, deletePerson }) => {
  return (
    <div key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={() => deletePerson(person.id, person.name)}>
        Delete
      </button>
    </div>
  );
};

export default Person;
