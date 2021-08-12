import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'

test('<NoteForm/> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn()

  const component = render(
    <NoteForm createNote={createNote}/>
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  // Simulate the input fields by creating a change event adn defining an object which contains the simulated input
  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)

  // Expect submission of form to call createNote once
  expect(createNote.mock.calls).toHaveLength(1)

  // Expect the event handler is called with the right parameters
  expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier')
})