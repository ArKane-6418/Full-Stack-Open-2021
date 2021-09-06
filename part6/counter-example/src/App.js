import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'

// Flux architecture: state is separated completely from React components into its own "stores"
// State in the store is changed indirectly through "actions"
// When action changes state of the store, views are rendered
// Action -> Dispatcher -> Store -> View
// If some action causes the need to change state, the change is made with an action that goes back to dispatcher
// Redux is a much simpler version of Flux, where the whole state is stored into one object in the store
// Actions are objects, which have at least a field determining its type


// Reducers are functions that are given the current state and an action and returns a new state

const counterReducer = (state = 0, action) => {
  // Customary to use switch statements
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

// Actions are sent/dispatched to the store with its dispatch method

store.dispatch({ type: 'INCREMENT' }) // 1
store.dispatch({ type: 'INCREMENT' }) // 2
store.dispatch({ type: 'INCREMENT' }) // 3

// We can determine the current state of the store using getState

console.log(store.getState())

store.dispatch({ type: 'ZERO' }) // 0
store.dispatch({ type: 'DECREMENT' }) // -1

console.log(store.getState())

// Subscribe is used to create callback functions the store calls when its state is changed
// Here, every change in the store would be printed to the console
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

store.dispatch({ type: 'INCREMENT' }) // 0
store.dispatch({ type: 'INCREMENT' }) // 1
store.dispatch({ type: 'INCREMENT' }) // 2
store.dispatch({ type: 'ZERO' }) // 0
store.dispatch({ type: 'DECREMENT' }) // -1


function App() {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  )
}

// When the state in the store is changed, React is not able to automatically rerender the app, which is why we have
// renderApp. We need to immediately call it otherwise the initial render would never happen

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App
