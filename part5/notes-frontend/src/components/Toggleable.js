import React, { useState, useImperativeHandle } from 'react'

// We should make it so the button label text prop must be given a value
// Accomplished with prop-types
import PropTypes from 'prop-types'

// Props.children is used for referencing the child components of the component
// Child components are the React elements that we define between opening and closing tags of a component
// children is automatically added by React and always exists
// If there's a self-closing tag, then props.children is an empty array
// Reusable for similar visibility toggling functionality

// Function is wrapped inside forwardRef function call so the component can access the ref assigned to it

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  // Inline style rules
  // If loginVisible is True, we do not want to display the button, so display gets set to None
  // If loginVisible is False, we want to display the form
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // useImperativeHandle makes toggleVisibility function available outside component
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="toggleableContent">
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable