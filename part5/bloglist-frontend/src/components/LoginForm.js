import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-btn" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm