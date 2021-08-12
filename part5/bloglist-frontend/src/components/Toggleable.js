import React, { useState, useImperativeHandle } from 'react'

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

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="toggleableComponent">
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable