const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

// Reducers must be pure functions as in they cannot cause any side effects and must always return the same response
// when called with the same parameters
// Reducer state must be composed of immutable objects, if there is a state change, it must be replaced with a new one
const noteReducer = (state = initialState, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE':
      // Find the id of the note to change from action.data
      const id = action.data.id
      // Find the corresponding note and create a new note with the value of important flipped
      // Then map that new note in with the old notes to state
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id === id ? changedNote : note)
    default:
      return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

// A module can have only one default export, but multiple normal exports

export default noteReducer