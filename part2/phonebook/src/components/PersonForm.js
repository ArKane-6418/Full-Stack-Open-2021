/* eslint-disable react/prop-types */
const PersonForm = (props) => {
  const { newName, addNewPerson, handleNameChange, newNumber, handleNumberChange } = props
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
/* eslint-enable react/prop-types */
export default PersonForm