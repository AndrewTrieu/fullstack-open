import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      anecdote.votes += 1;
    },
    add(state, action) {
      const anecdote = action.payload;
      state.push(anecdote);
    },
    set(state, action) {
      return action.payload;
    },
  },
});

export const { vote, add, set } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(set(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(add(anecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.addVote(id);
    dispatch(vote(id));
  };
};

export default anecdoteSlice.reducer;
