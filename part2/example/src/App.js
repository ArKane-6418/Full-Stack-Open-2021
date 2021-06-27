import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'


const App = () => {

    const [notes, setNotes] = useState([])

    // How do we access data contained in form's input element?
    // Let's look at controlled components

    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)


    // When data arrives from server, the JS runtime calls the function registered as the event handler, which prints
    // "promise fulfilled" to the console and stores the notes received into the state
    // Upon the re-render, "render 3 notes" is printed to the console and the notes fetched from the server
    // are rendered

    const hook = () => {
        console.log("effect")
        axios
          .get('http://localhost:3002/notes')
          .then(response => {
              console.log("promise fulfilled")
              setNotes(response.data)
          })
    }
    useEffect(hook, [])

    // Second parameter of useEffect is used to specify how often the effect is run
    console.log('render', notes.length, 'notes')
    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const addNote = (event) => {
        // Prevents default action of submitting a form
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1
        }
        setNotes(notes.concat(noteObject))
        setNewNote('')
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
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>
        <ul>
            {notesToShow.map(note => <Note key={note.id} note={note}/>)}
        </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App