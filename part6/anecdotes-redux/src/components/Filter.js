import React from "react"
import { updateFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const style = {
  marginBottom: 10
}

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(updateFilter(filter))
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange}/>
    </div>
  )
}

export default Filter