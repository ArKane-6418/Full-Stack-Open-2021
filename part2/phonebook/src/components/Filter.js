/* eslint-disable react/prop-types */
const Filter = (props) => {
  const { search, handleChange } = props
  return (
    <div>
      filter shown with <input value={search} onChange={handleChange}/>
    </div>
  )
}
/* eslint-enable react/prop-types */
export default Filter