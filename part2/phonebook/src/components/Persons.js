import Person from "./Person";

const Persons = ({ persons, search, setPersons, setMessage }) => {
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

export default Persons