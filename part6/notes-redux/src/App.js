import './App.css';
import React, { useEffect } from 'react'
import NewNote from './components/newNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

// Not necessary for React components to know the Redux action types and forms
// Functions that create actions are called "action creators"

// NewNote is not aware that the event handler it gets as props dispatches an action (createNote(content))
// Notes is a container component, it contains some application logic
// It defines the functionality of the event handlers of the Note component (dispatching the importance)

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService.getAll().then(notes => dispatch(initializeNotes(notes)))
  }, [dispatch])

  // Add some radio buttons for toggling importance

  return (
    <div>
      <NewNote/>
      <VisibilityFilter/>
      <Notes/>
    </div>
  )
}

export default App;
