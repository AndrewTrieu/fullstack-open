import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Form = () => {
  const dispatch = useDispatch();

  const handleNew = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(add(content));
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
