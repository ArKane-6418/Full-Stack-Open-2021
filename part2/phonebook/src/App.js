import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PhonebookService from './services/phonebook_data'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [search, setSearch] = useState('')

  const [successMessage, setSuccessMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  
  const timeLimit = 5000;

  const hook = () => {
    console.log("effect")
    PhonebookService.getAll()
      .then(returnedData => setPersons(returnedData))
  }

  useEffect(hook, [])

  const addNewPerson = (event) => {
    console.log(persons)
    // Prevent default behaviour of sending form
    event.preventDefault()

    // If you try to enter a person's name when they already exist with the exact number provided, alert message
    if (persons.filter(person => person.name === newName && person.number === newNumber).length === 1) {
      alert(`${newName} has already been added to the phonebook with phone number ${newNumber}`)
    }

    // Update the person's number
    else if (persons.filter(person => person.name === newName).length === 1) {
      if (window.confirm(`${newName} has already been added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}

        PhonebookService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setSuccessMessage(`Updated ${returnedPerson.name}'s phone number`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, timeLimit)
          })
          .catch(error => {
            // If we can't update the person's number, set error message and timeout
              setErrorMessage(`Information of ${person.name} has already been removed from the server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, timeLimit)
            }
          )
      }

      // Create new person record and add it to persons array
    } else {
      const personObject = {name: newName, number: newNumber}
      PhonebookService.create(personObject)
        .then(returnedPerson => {
          // Update the persons array
          setPersons(persons.concat(returnedPerson))
          // Set appropriate message and timeout
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, timeLimit)

          // Reset name and number fields
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


  return (
    <div>
      <h2>Phonebook</h2>
      {/*Displays either success message or error message based on which is non empty*/}
      {successMessage && <Notification message={successMessage}/>}
      {/*Updating persons array happens in Person component*/}
      {errorMessage && <Notification message={errorMessage} error={true}/>}

      <Filter search={search} handleChange={handleSearchChange}/>
      <h3> Add a new </h3>
        <PersonForm newName={newName} addNewPerson={addNewPerson} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} setPersons={setPersons} setMessage={setSuccessMessage}/>
    </div>
  )
}

export default App