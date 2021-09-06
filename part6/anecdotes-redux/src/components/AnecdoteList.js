import React from 'react'
import { vote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";

const Anecdote = (anecdote) => {

  const dispatch = useDispatch()
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state =>
    state.anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes))


  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          anecdote={anecdote}
        />
      )}
    </div>
  )
}

export default AnecdoteList