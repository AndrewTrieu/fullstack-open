import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import List from "./components/List";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);
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
