import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const Form = () => {
  const dispatch = useDispatch();

  const handleNew = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(add(newAnecdote));
    dispatch(setNotification(`You added "${content}"`));
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
