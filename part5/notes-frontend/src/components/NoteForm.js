import React, { useState } from 'react'
import PropTypes from 'prop-types'
// App component doesn't need form state for anything so it's better to move the form state to the actual components
const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('a new note...')

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    // Prevents default action of submitting a form
    event.preventDefault()
    // Let server generate id for resources
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    createNote(noteObject)
    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

NoteForm.PropTypes = {
  createNote: PropTypes.func.isRequired
}

export default NoteForm