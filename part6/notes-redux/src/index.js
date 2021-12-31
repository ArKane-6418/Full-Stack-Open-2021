import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import App from './App';
import { initializeNotes } from './reducers/noteReducer'
import { store } from './store'
import noteService from './services/notes'

noteService.getAll().then(notes => 
  store.dispatch(initializeNotes(notes))
)

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

