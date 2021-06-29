const Notification = ({ message, error = false }) => {
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

export default Notification