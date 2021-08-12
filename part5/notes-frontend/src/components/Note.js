import React from 'react'

// When we make the note its own component, we need to pass in the key
const Note = ({ note, toggleImportance }) => {
  // Add button to toggle if a note is important or not
  const label = note.important ? 'Make Unimportant' : 'Make Important'

  // Change so content is inside span, Cypress tests will break since span doesn't contain button
  // Fix using .parent()
  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )

}

export default Note