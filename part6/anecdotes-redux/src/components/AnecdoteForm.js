import React from 'react'
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationMessage } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(setNotificationMessage(`Created new anecdote: ${content}`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(event) => createAnecdote(event)}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm