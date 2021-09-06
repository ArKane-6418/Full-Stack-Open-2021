import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App';
import noteReducer from './reducers/noteReducer'
import filterReducer from "./reducers/filterReducer";

// We can combine our two reducers using combineReducers
// How does the combined reducer work?
// After adding a log statement to both reducers, the console shows duplicates, but why?
// The combined reducer works in a way that every action gets handled in every part of the combined reducer
// Multiple reducers can change their respective parts of the state based on the same action
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

console.log(store.getState())

// Test code
/*
store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))
*/

// App is now a child of a Provider component
// If the application has many components that need the store, the App component must pass store as props to all
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

