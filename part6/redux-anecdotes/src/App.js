import React from "react";
import List from "./components/List";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <List />
      <Form />
    </div>
  );
};

export default App;
