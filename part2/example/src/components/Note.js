import React from 'react'

// When we make the note its own component, we need to pass in the key
const Note = ({ note }) => <li>{note.content}</li>

export default Note