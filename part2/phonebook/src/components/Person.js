import PhonebookService from '../services/phonebook_data'
/* eslint-disable react/prop-types */
const Person = (props) => {

  const { person, setPersons, setMessage } = props

  // Define delete handle code

  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      PhonebookService.deletePerson(person.id)
      // We need to call getAll() to eventually update the persons array
      PhonebookService.getAll().then(data => setPersons(data))
      setMessage(`Deleted ${person.name} from the server`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={handleDelete}>Delete</button></td>
    </tr>
  )
}
/* eslint-enable react/prop-types */
export default Person