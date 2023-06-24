import { useQueryClient, useMutation } from "react-query";
import { createAnecdote } from "./requests";
import { useNotificationDispatch } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const mutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", [...anecdotes, newAnecdote]);
    },
    onError: (err) => {
      dispatch({
        type: "SET_NOTIFICATION",
        data: `An error occurred: ${err.response.data.error}`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const getId = () => (100000 * Math.random()).toFixed(0);

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    mutation.mutate({
      content,
      id: getId(),
      votes: 0,
    });
    await dispatch({
      type: "SET_NOTIFICATION",
      data: `You created '${content}'`,
    });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
