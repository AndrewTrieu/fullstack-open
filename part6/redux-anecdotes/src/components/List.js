import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const List = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(
      setNotification(
        `You voted for "${
          anecdotes.find((anecdote) => anecdote.id === id).content
        }"`,
        5
      )
    );
  };

  return (
    <div>
      <h2>List of anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              <p>
                "{anecdote.content}"&nbsp;has&nbsp;{anecdote.votes}&nbsp;votes
                <br />
                <button onClick={() => handleVote(anecdote.id)}>Vote</button>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default List;
