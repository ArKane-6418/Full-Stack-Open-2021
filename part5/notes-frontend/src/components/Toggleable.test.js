import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Toggleable from './Toggleable'

describe('<Toggleable/>', () => {
  let component

  // Before running any test, render the component
  beforeEach(() => {
    component = render(
      <Toggleable buttonLabel="show">
        <div className="testDiv"/>
      </Toggleable>
    )
  })

  // Test that the Toggleable component renders its child component
  test('render children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  // Test if nothing is displayed at the start
  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.toggleableContent')

    expect(div).toHaveStyle('display: none')
  })

  // Test if the data is displaued after clicking the button
  test('after clicking the button, children displayed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.toggleableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  // The first button is for making things visible, the second button is the cancel button
  test('toggled content can be closed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const closeButton = component.getByText('Cancel')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })
})