import Person from './Person'
/* eslint-disable react/prop-types */
const Persons = (props) => {

  const { persons, search, setPersons, setMessage } = props
  // Return the data in a table format for organization
  return (
    <div>
      <table>
        <tbody>
          {persons.map(p => {
          // This is for filtering out people by their names
            if (search.length === 0 || p.name.search(search) !== -1) {
              return <Person key={p.id} person={p} setPersons={setPersons} setMessage={setMessage}/>
            }
            else {
              return null
            }
          }
          )
          }
        </tbody>
      </table>
    </div>
  )
}
/* eslint-enable react/prop-types */
export default Persons