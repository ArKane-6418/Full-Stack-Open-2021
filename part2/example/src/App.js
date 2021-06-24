import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {

    const [notes, setNotes] = useState(props.notes)

    // How do we access data contained in form's input element?
    // Let's look at controlled components

    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

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