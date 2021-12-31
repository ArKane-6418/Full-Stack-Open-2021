import React from 'react'
import { addVote } from "../reducers/anecdoteReducer";
import { setNotificationMessage } from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    let res = anecdotes
    if (filter) {
      res = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
    return res
  })

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotificationMessage(`You voted for: ${anecdote.content}`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id}
          anecdote={anecdote} handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList