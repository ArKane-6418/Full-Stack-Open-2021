import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*let counter = 1

const refresh = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App counter={counter}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
*/

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
// To re-render unoptimally, call ReactDOM.render multiple times
/* refresh()
counter += 1
refresh()
counter += 1
refresh
*/

// You can also set an interval for refresh rate
/* setInterval(() => {
    refresh()
    counter += 1}, 1000)
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
