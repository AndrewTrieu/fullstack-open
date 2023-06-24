import { useQueryClient, useMutation } from "react-query";
import { createAnecdote } from "./requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", [...anecdotes, newAnecdote]);
    },
  });

  const getId = () => (100000 * Math.random()).toFixed(0);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    mutation.mutate({
      content,
      id: getId(),
      votes: 0,
    });
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
