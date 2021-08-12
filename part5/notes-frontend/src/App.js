import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Toggleable from './components/Toggleable'
import './index.css'

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

  // Acts as a reference to the NoteForm component
  // Ensures the same reference is kept throughout re-renders
  const noteFormRef = useRef()

  const [notes, setNotes] = useState([])

  // How do we access data contained in form's input element?
  // Let's look at controlled components


  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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
        console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  // Of course, when we enter the page, the app needs to check if user details of a logged-in user can be found

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // Set user and user token
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  // Second parameter of useEffect is used to specify how often the effect is run
  console.log('render', notes.length, 'notes')
  const notesToShow = showAll ? notes : notes.filter(note => note.important)


  // We want to hide the form upon adding a new note, but the toggle is in NoteForm.js so how do we handle this?
  // We use ref
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    // Create POST request here
    noteService.create(noteObject)
      .then(returnedNote => {
        // Need to update the notes object for the new note to render on screen
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = (id) => {
    // Find the note with the specified <id>
    const note = notes.find(n => n.id === id)
    // Change the note to update importance value
    const changedNote = { ...note, important: !note.important }
    // Replace the old note with a PUT request and update notes array

    // If the note id doesn't match, copy the original into the new array, otherwise we get the new note from response.data
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      // If we can't update the note, it means it no longer exists in the backend
      // Therefore, we need to set our notes array to all the notes excluding the one that no longer exists
      .catch(() => {
        setErrorMessage(`The note '${note.content}' was already deleted from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        // setNotes(notes.filter(n => n.id !== id))
      })
    console.log(`Note ${id} is ${note.important ? 'important' : 'unimportant'}`)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      // Since values saved to local storage are DOMstrings, we need to stringify JSON objects
      // Similarly, when we want to retrieve that info, we need to parse the JSON

      setUser(user) // Token returned with successful login
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Toggleable buttonLabel="Log In">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Toggleable>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  const noteForm = () => (
    <Toggleable buttonLabel="New Note" ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Toggleable>
  )

  // Each imported component needs a key element
  // key gets passed in, but in the Note attributes even though we didn't define a note.key (because of the li tags)

  // App component now controls behaviour of input because we assigned the component state to value
  // Register an event handler that syncs changes made to input with component's state

  // Only render the login form if the user hasn't logged in
  // Only render the note form if the user has logged in
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {logoutForm()}
          {noteForm()}
        </div>
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => <Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>

      <Footer/>
    </div>
  )
}

export default App