import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import PhonebookService from './services/phonebook_data'

const App = () => {
  const [ persons, setPersons ] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [search, setSearch] = useState('')

  const filterNames = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const hook = () => {
    console.log("effect")
    PhonebookService.getAll()
      .then(returnedData => setPersons(returnedData))
  }

  useEffect(hook, [])

  const addNewPerson = (event) => {
    console.log(persons)
    event.preventDefault()

    if (persons.filter(person => person.name === newName && person.number === newNumber).length === 1) {
      alert(`${newName} has already been added to the phonebook with phone number ${newNumber}`)
    }
    else if (persons.filter(person => person.name === newName).length === 1) {
      if (window.confirm(`${newName} has already been added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}

        PhonebookService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
      }
    } else {
      const personObject = {name: newName, number: newNumber}
      PhonebookService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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

  const deleteRecord = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      PhonebookService
        .deletePerson(id)
        .then(returnedPerson => {
            setPersons(persons.filter(p => p.id !== returnedPerson.id))
          }
        )
      console.log(`Person with id ${id} has been removed`)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter search={search} handleChange={handleSearchChange}/>
      <h3> Add a new </h3>
        <PersonForm newName={newName} addNewPerson={addNewPerson} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {filterNames.map(person => <Person key={person.name} person={person} handleDelete={() => deleteRecord(person.id)}/>)}
    </div>
  )
}

export default App