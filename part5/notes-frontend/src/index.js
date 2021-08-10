import ReactDOM from 'react-dom'
import React from 'react'
import App from './App.js'

/* const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http.//localhost:3001/foobar')
console.log(promise2)

// Promise is an object representing the eventual completion or failure of an async operation

// 3 distinct states
// 1. Promise is pending: final value is not available yet
// 2. Promise is fulfilled, operation has completed and final value is available (also called resolved)
// 3. Promise is rejected, error prevented the final value from being determined

// If and when we want to access the result of the operation represented by the promise, we must register an event
// handler, which is achieved using .then():

promise.then(response => console.log(response))

*/

// const notes = [
//     {
//         id: 1,
//         content: 'HTML is easy',
//         date: '2019-05-30T17:30:31.098Z',
//         important: true
//     },
//     {
//         id: 2,
//         content: 'Browser can execute only JavaScript',
//         date: '2019-05-30T18:39:34.091Z',
//         important: false
//     },
//     {
//         id: 3,
//         content: 'GET and POST are the most important methods of HTTP protocol',
//         date: '2019-05-30T19:20:14.298Z',
//         important: true
//     }
// ]

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
