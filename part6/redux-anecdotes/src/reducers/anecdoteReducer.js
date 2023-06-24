import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { vote, add } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
