import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'


const Footer = () => {
  // Inline styling
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Joshua Ong, Full Stack Open 2021</em>
    </div>
  )
}

// In REST, individual data objects are called resources and are ffetched with a GET request
// Creating a new resource involves making a POST request to the specified URL
const App = () => {

  const [notes, setNotes] = useState([])

  // How do we access data contained in form's input element?
  // Let's look at controlled components

  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)



  // When data arrives from server, the JS runtime calls the function registered as the event handler, which prints
  // "promise fulfilled" to the console and stores the notes received into the state
  // Upon the re-render, "render 3 notes" is printed to the console and the notes fetched from the server
  // are rendered

  // If we hardcode a note object into getAll that doesn't exist in the backend, trying to change one of the values
  // will cause a 404 not found error. We handle it with a catch statement (recall the rejection state of a promise(
  const hook = () => {
      noteService
        .getAll()
        .then(initialNotes => {
            console.log("promise fulfilled")
            setNotes(initialNotes)
        })
  }
  useEffect(hook, [])

  // Second parameter of useEffect is used to specify how often the effect is run
  console.log('render', notes.length, 'notes')
  const notesToShow = showAll ? notes : notes.filter(note => note.important)


  const addNote = (event) => {
    // Prevents default action of submitting a form
    event.preventDefault()
    // Let server generate id for resources
    const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() < 0.5,
    }
    // Create POST request here
    noteService.create(noteObject)
      .then(returnedNote => {
        // Need to update the notes object for the new note to render on screen
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    // Find the note with the specified <id>
    const note = notes.find(n => n.id === id)
    // Change the note to update importance value
    const changedNote = {...note, important: !note.important}
    // Replace the old note with a PUT request and update notes array

    // If the note id doesn't match, copy the original into the new array, otherwise we get the new note from response.data
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      // If we can't update the note, it means it no longer exists in the backend
      // Therefore, we need to set our notes array to all the notes excluding the one that no longer exists
      .catch(error => {
        setErrorMessage(`The note '${note.content}' was already deleted from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        // setNotes(notes.filter(n => n.id !== id))
      })
    console.log(`Note ${id} is ${note.important ? "important" : "unimportant"}`)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // Each imported component needs a key element
  // key gets passed in, but in the Note attributes even though we didn't define a note.key (because of the li tags)

  // App component now controls behaviour of input because we assigned the component state to value
  // Register an event handler that syncs changes made to input with component's state
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => <Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App