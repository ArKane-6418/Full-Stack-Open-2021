import React from 'react'

const Search = ( {search, setSearch }) => {

  // Only set the search value if the search bar has a value
  const handleChange = (event) => {
    let value = ""
    if (event.target.value.length > 0) {
      value = event.target.value
    }
    setSearch(value)
  }
  return (
    <div>
      find countries <input value={search} onChange={handleChange}/>
    </div>
  )
}

export default Search