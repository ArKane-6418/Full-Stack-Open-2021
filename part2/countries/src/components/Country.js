import React, { useState, useEffect } from 'react'
import ShowButton from "./ShowButton";
import Weather from "./Weather"
import axios from 'axios'

const Country = ({ country, showCountry, setShow }) => {

  const [icon, setIcon] = useState('')
  const [temp, setTemp] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [windDir, setWindDir] = useState('')
  // Set up api key
  const api_key = process.env.REACT_APP_API_KEY
  // console.log(api_key)
  const weatherstack_api = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
  // console.log(weatherstack_api)

  useEffect(() => {
    // console.log(country.capital)
    axios
      .get(weatherstack_api)
      .then(response => {
        // console.log(response.data['current'])
        // Read in all the relevant response data
        setIcon(response.data['current']['weather_icons'][0])
        setTemp(response.data['current']['temperature'])
        setWindSpeed(response.data['current']['wind_speed'])
        setWindDir(response.data['current']['wind_dir'])
        // console.log(response.data['current']['weather_descriptions'][0])
      })
  }, [weatherstack_api])
  // If the show button is clicked, render the data
  if (showCountry[country.name]) {
    return (
      <div>
        <h2>{country.name}</h2>
        <div>capital {country['capital']}</div>
        <div>population {country['population']}</div>
        <h3>languages</h3>
        <ul>
          {country.languages.map(language => <li key={language['nativeName']}>{language['name']}</li>)}
        </ul>
        <img src={country.flag} alt="flag" width="10%"/>
        {/*Render weather data through separate component*/}
        <Weather capital={country.capital} icon={icon} temperature={temp} wind_speed={windSpeed} wind_dir={windDir}/>
        <ShowButton name={country.name} showCountry={showCountry} setShow={setShow}/>
      </div>
    )
  }
  return (
    <div>
      {country.name}
      <ShowButton name={country.name} showCountry={showCountry} setShow={setShow}/>
    </div>
  )
}

export default Country