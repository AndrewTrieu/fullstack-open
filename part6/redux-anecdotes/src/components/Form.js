import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { addAnecdote } from "../reducers/anecdoteReducer";

const Form = () => {
  const dispatch = useDispatch();

  const handleNew = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(content));
    dispatch(setNotification(`You added "${content}"`, 5));
  };

  return (
    <div>
      <h2>Add new anecdote</h2>
      <form onSubmit={handleNew}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
