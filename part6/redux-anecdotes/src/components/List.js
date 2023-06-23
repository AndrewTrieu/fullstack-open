import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const List = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
    });

    const handleVote = (id) => {
        dispatch(addVote(id));
    }

    return (
        <div>
            <h2>List of anecdotes</h2>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>
                        <p>"{anecdote.content}"&nbsp;has&nbsp;{anecdote.votes}&nbsp;votes<br />
                        <button onClick={() => handleVote(anecdote.id)}>Vote</button>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default List;
