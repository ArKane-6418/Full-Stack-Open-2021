import React, { useState } from 'react'

// Create Button component
const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
    ]
    // Define state for selected
    const [selected, setSelected] = useState(0)

    // Define state for vote_array and create a copy for it to manage the state
    const [vote_array, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const copy = [...vote_array]

    const clickAnecdote = () => {
        // Expression guaranteed the index is between 0 and anecdotes.length - 1
        setSelected(Math.floor(Math.random() * anecdotes.length))
    }

    const clickVote = (selected) => {
        // Update the copy and set the state of the array to copy
        copy[selected] += 1
        setVotes(copy)
    }
    return (
        <div>
            <h1>
                Anecdote of the day
            </h1>
            <div>
                {anecdotes[selected]}
            </div>
            <div>
                has {vote_array[selected]} votes
            </div>
            <Button handleClick={() => clickVote(selected)} text="vote"/>
            <Button handleClick={clickAnecdote} text="next anecdote"/>

            <h1>
                Anecdote with the most votes
            </h1>
            <div>
                {anecdotes[vote_array.indexOf(Math.max(...vote_array))]}
            </div>
            <div>
                has {Math.max(...vote_array)} votes
            </div>
        </div>
    )
}

export default App;