import React from 'react'

const Weather = ({ capital, icon, temperature, wind_speed, wind_dir }) => {
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div><b>temperature:</b> {temperature} degrees Celsius</div>
      <img src={icon} alt="Weather icon" width="5%"/>
      <div><b>Wind:</b> {wind_speed} mph</div>
      <div><b>Direction:</b> {wind_dir}</div>
    </div>
  )
}

export default Weather