import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const Form = () => {
    const dispatch = useDispatch();

    const handleNew = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(addAnecdote(content));
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
