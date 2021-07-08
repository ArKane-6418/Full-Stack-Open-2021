/* eslint-disable react/prop-types */
const Notification = (props) => {
  const { message, error = false } = props
  if (message) {
    if (error) {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
    else {
      return (
        <div className="notif">
          {message}
        </div>
      )
    }
  }
  return null
}
/* eslint-enable react/prop-types */
export default Notification