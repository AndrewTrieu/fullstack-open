import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAnecdotes, updateAnecdote } from "./components/requests";
import { useNotificationDispatch } from "./reducers/notificationReducer";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const mutation = useMutation(updateAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((oldAnecdote) =>
          oldAnecdote.id === newAnecdote.id ? newAnecdote : oldAnecdote
        )
      );
    },
  });

  const handleVote = async (anecdote) => {
    mutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    await dispatch({
      type: "SET_NOTIFICATION",
      data: `You voted '${anecdote.content}'`,
    });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  const { data: anecdotes, status } = useQuery("anecdotes", getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (status === "loading") {
    return <div>loading...</div>;
  }

  if (status === "error") {
    return <div>error</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
