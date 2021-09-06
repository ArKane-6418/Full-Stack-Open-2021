import './App.css';
import React from 'react'
import NewNote from './components/newNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

// Not necessary for React components to know the Redux action types and forms
// Functions that create actions are called "action creators"

// NewNote is not aware that the event handler it gets as props dispatches an action (createNote(content))
// Notes is a container component, it contains some application logic
// It defines the functionality of the event handlers of the Note component (dispatching the importance)

const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }

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
