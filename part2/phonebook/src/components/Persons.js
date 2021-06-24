import React from 'react'

const Persons = ({ filterNames }) => {
  return (
    <div>
      {filterNames.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default Persons