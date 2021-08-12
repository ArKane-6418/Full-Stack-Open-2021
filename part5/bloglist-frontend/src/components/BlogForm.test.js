import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm/> component', () => {

  const mockCreate = jest.fn()

  const component = render(
    <BlogForm createBlog={mockCreate}/>
  )

  test('form calls event handler as props with correct details', () => {
    const title_input = component.container.querySelector('#title-input')
    const author_input = component.container.querySelector('#author-input')
    const url_input = component.container.querySelector('#url-input')
    const form = component.container.querySelector('form')

    fireEvent.change(title_input, {
      target: { value: 'Simulating title input' }
    })

    fireEvent.change(author_input, {
      target: { value: 'Simulating author input' }
    })

    fireEvent.change(url_input, {
      target: { value: 'Simulating url input' }
    })

    fireEvent.submit(form)

    expect(mockCreate.mock.calls).toHaveLength(1)

    expect(mockCreate.mock.calls[0][0].title).toBe('Simulating title input')
    expect(mockCreate.mock.calls[0][0].author).toBe('Simulating author input')
    expect(mockCreate.mock.calls[0][0].url).toBe('Simulating url input')
  })
})