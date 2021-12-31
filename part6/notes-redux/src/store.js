import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import noteReducer, { initializeNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer';

// Redux thunk enables us to create asynchronous actions.
// It's a so-called redux middleware which much be initialized with the store
// This is all for the purpose of abstracting away the communication with the server from the components

// We can combine our two reducers using combineReducers
// How does the combined reducer work?
// After adding a log statement to both reducers, the console shows duplicates, but why?
// The combined reducer works in a way that every action gets handled in every part of the combined reducer
// Multiple reducers can change their respective parts of the state based on the same action
const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
})

// With redux thunk, it's possible to define action creators so that they return a function having the dispatch method as its parameter

  
const store = createStore(reducer, composeWithDevTools(), applyMiddleware(thunk))

export default store
