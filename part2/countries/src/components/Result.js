import React from 'react'
import Country from './Country'

const Result = ( {countries, name, showCountry, setShow } ) => {
  // Only render data if the search bar is not empty
  if (name) {
    if (countries.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
    else if (countries.length > 1) {
      return (
        <div>
          {countries.map(country => <Country key={country.name} country={country} showCountry={showCountry} setShow={setShow}/>)}
        </div>
      )
    }
    else if (countries.length === 1) {
      return (
        <div>
          <Country country={countries[0]} showCountry={showCountry} setShow={setShow}/>
        </div>
      )
    }
  }

  // If there is nothing in the search bar, don't render any countries
  return (<></>)
}

export default Result