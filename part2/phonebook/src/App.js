import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [search, setSearch] = useState('')

  const filterNames = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const hook = () => {
    console.log("effect")
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
  }

  useEffect(hook, [])

  const addNewPerson = (event) => {
    console.log(persons)
    event.preventDefault()

    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {name: newName, number: newNumber}
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter search={search} handleChange={handleSearchChange}/>
      <h3> Add a new </h3>
        <PersonForm newName={newName} addNewPerson={addNewPerson} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filterNames={filterNames}/>
    </div>
  )
}

export default App