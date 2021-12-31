import React from 'react'
import { useDispatch } from "react-redux";
// Normal exported functions can be imported with curly brace
import { createNote } from "../reducers/noteReducer";
import noteService from "../services/notes"

// Separate the form into its own component
// Note that the event handler for changing the app state is now in a child component
const NewNote =  () => {
  // useDispatch hook provides any react component access to the dispatch function of the redux-store in index.js
  // Allows all components to make changes to the state of redux-store
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    // We can get the content straight from the form field because the input field's name is "note"
    const content = event.target.note.value
    event.target.note.value = ''
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }

  // We have not bound the state of the form fields to the state of the App component
  // Uncontrolled forms cannot have dynamic error messages or disable the submit button based on input

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote