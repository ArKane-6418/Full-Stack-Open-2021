import React from 'react'

const ShowButton = ({ name, showCountry, setShow }) => {

  const handleChange = () => {
    // Since we have a dictionary, to update the state, you have to create a copy
    let alterShow = {...showCountry}
    // Flips the value of show for the specified country
    alterShow[name] = !showCountry[name]
    // Updates the dictionary with setShow
    setShow(alterShow)
  }

  return (
    <button onClick={handleChange}>
      {!showCountry[name] && "Show"}
      {showCountry[name] && "Don't Show"}
    </button>
  )
}

export default ShowButton
