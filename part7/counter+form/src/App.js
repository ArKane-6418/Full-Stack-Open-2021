import './App.css';
import React from 'react'
// import { useCounter } from './hooks';
import { useField } from './hooks';

// We can extract the state of the App component and its manipulation entirely into the useCounter hook.

// One major benefit is that these hooks can be reused
/* const App = (props) => {
  const counter = useCounter()

  return (
    <div>
      <div>{counter}</div>
      <button onClick={counter.increase}>
        plus
      </button>
      <button onClick={counter.decrease}>
        minus
      </button>      
      <button onClick={counter.zero}>
        zero
      </button>
    </div>
  )
}
*/

// Here's an example using forms
// Every field of the form has its own state and we want to keep its state synchronized with the data inputted

const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name: 
        <input {...name}/> 
        <br/> 
        birthdate:
        <input {...born}/>
        <br /> 
        height:
        <input {...height}/>
      </form>
      <div>
        {name} {born} {height} 
      </div>
    </div>
  )
}

export default App;
