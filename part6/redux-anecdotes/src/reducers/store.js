import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer, { add } from "./anecdoteReducer";
import filterReducer from "./filterReducer";
import notificationReducer from "./notificationReducer";
import anecdoteService from "../services/anecdotes";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

anecdoteService.getAll().then((anecdotes) => {
  anecdotes.forEach((anecdote) => {
    store.dispatch(add(anecdote));
  });
});

export default store;
