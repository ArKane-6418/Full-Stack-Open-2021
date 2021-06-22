import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'

/* Defining multiple components
   Can pass in arguments, known as props
   All components must be capitalized

*/

/* Note that we're using object notation to access elements of a prop, meaning we can
   destructure the prop and assign them to variables to make our life easier
*/

/* const Hello = (props) => {
    const { name, age } = props
    const bornYear = () => new Date().getFullYear() - props.age

    return (
        <div>
            <p>Hello {name}, nice to meet you. You are {age} years old</p>
            <p>You were most likely born in {bornYear()}</p>
        </div>
    )
}
*/

/* const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  const name = "Joshua";
  const age = 20;
 */

  /* Any code within {} is Javascript code and will be evaluated
     Result is embedded into the HTML produced by the component
     React components are mostly written using JSX
     Dealing with a way to write JS. JSX returned by React components is compiled into JS
     Compiling handled by Babel
     JSX is XML like, every tag needs to be closed
  */
/*
    return (
        <div>
            <p>Hello Joshua, it is {now.toString()}</p>
            <p>
                {a} + {b} is equal to {a + b}
            </p>
            <Hello name={name} age={age}/>
            <Hello name="Me" age={19}/>
            <Hello name="Mez" age={19}/>
        </div>
    )
}
*/

// Re-rendering pages

/* const App = ({counter}) => {
    return (
        <div>{counter}</div>
    )
}
*/

// Stateful Component

/* const App = () => {
    // Initialize counter to 0 and declare function
    const [counter, setCounter] = useState(0)

    setTimeout(
        // Every second,  after setTimeout is called, invoke setCounter to increment counter by 1
        // When the state modifying function (setCounter in this case) is called, React re-renders the component
        () => setCounter(counter + 1),
        1000
    )

    return (
        <div>{counter}</div>
    )
}

*/

// Event handlers

/* const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const App = () => {
    // Initialize counter to 0 and declare function
    const [counter, setCounter] = useState(0)

    // Define event handler function
    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    // Every click of the button will call the handleClick function
    return (
        <div>
            <Display counter={counter}/>
            <Button handleClick={increaseByOne}
            text='plus'/>
            <Button handleClick={decreaseByOne}
                    text='minus'/>
            <Button handleClick={setToZero}
            text='zero'/>
        </div>
    )
}

*/

// Conditional rendering

/*
const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                The app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            Button Press History: {props.allClicks.join(" ")}
        </div>
    )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>


const App = () => {
    // const [clicks, setClicks] = useState({
    //     left: 0, right: 0
    // })

    // Handling arrays

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left+1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right+1)
    }

    return (
        <div>
            {left}
            <Button handleClick={handleLeftClick} text="left"/>
            <Button handleClick={handleRightClick} text="right"/>
            {right}
            <History allClicks={allClicks} />
        </div>
    )
}

*/
// React Hooks may only be called from inside of a function body that defines a React component
// Functions that return functions are useful because you can customize functionality with parameters
// If you just have a normal function, you have to pass in the function and not the function call
// What if we wanted to pass in a parameter but for a normal function as our event handler?
// Up until now, any event handler we've defined has had no parameters (), if we want to customize functionality,
// all we need to do is pass in a parameter


const Display = ({value}) => <div>{value}</div>

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const App = () => {
    const [value, setValue] = useState(10)

    const setToValue = (newValue) => setValue(newValue)

    return (
        <div>
            <Display value={value}/>
            <Button handleClick={() => setToValue(1000)} text="thousand"/>
            <Button handleClick={() => setToValue(0)} text="reset"/>
            <Button handleClick={() => setToValue(value+1)} text="increment"/>
        </div>
    )
}

// Never define components inside other components
// React treats them as a new component in ever render, making it impossible to optimize
export default App;
