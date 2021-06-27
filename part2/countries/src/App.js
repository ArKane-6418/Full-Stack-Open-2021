
import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Result from './components/Result'

function App() {

  // Set up state variables and state updating functions

  // Sets search variable
  const [search, setSearch] = useState('')

  // Sets array of countries
  const [countries, setCountries] = useState([])

  // Sets dictionary of countries to show
  const [showCountry, setShow] = useState({})

  let url = ""

  // If nothing is entered, data should be gotten from all countries
  if (search.length === 0) {
    url = 'https://restcountries.eu/rest/v2/all'
  }
  // Otherwise, let the website filter for you
  else {
    url = `https://restcountries.eu/rest/v2/name/${search}`
  }

  // Set up hook to get the data from the url
  const hook = () => {
    axios
      .get(url)
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [url])
  // console.log(countries)

  // Set all countries to not show data initially
  useEffect(() => {
    let change = {}
    countries.forEach(country => change[country.name] = false)
    setShow(change)
  }, [countries])

  // console.log(countries)

  return (
    <div>
      <Search search={search} setSearch={setSearch}/>
      <Result countries={countries} name={search} showCountry={showCountry} setShow={setShow}/>
    </div>
  );
}

export default App;
