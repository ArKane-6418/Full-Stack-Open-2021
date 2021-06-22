import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const Statistic = (props) => {
    return (
        // Rethr table row with text and value to be used in the table
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}
const Statistics = ({good, neutral, bad}) => {
    // Conditional component render
    if (good + neutral + bad === 0) {
        return (
            <div>No feedback given</div>
        )
    }
    return (
        <table>
            <tbody>
            <Statistic text="good" value={good}/>
            <Statistic text="neutral" value={neutral}/>
            <Statistic text="bad" value={bad}/>
            <Statistic text="all" value={good + neutral + bad}/>
            <Statistic text="average" value={(good - bad) / (good + neutral + bad)}/>
            <Statistic text="positive" value={good * 100 / (good + neutral + bad) + "%"}/>
            </tbody>
        </table>
    )
}


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const ClickGood = () => {
        // Update good value
        setGood(good + 1)
        console.log(good);
    }
    const ClickNeutral = () => {
        // Update neutral value
        setNeutral(neutral + 1)
        console.log(neutral);
    }
    const ClickBad = () => {
        // Update bad value
        setBad(bad + 1)
        console.log(bad);
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={ClickGood} text="good"/>
            <Button handleClick={ClickNeutral} text="neutral"/>
            <Button handleClick={ClickBad} text="bad"/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App