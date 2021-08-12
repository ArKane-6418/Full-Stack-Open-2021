import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog/> component', () => {
  let component

  const mockUpdate = jest.fn()
  const mockDelete = jest.fn()

  beforeEach(() => {
    const user = {
      username: 'username',
      name: 'name'
    }

    const blog = {
      title: 'Title',
      author: 'Author',
      url: 'url',
      likes: 0,
      user: {
        username: 'username'
      }
    }
    component = render(
      <Blog blog={blog} handleUpdateBlog={mockUpdate} user={user} handleDeleteBlog={mockDelete}/>
    )
    component.debug()
  })

  test('render component', () => {
    expect(component).toBeDefined()
  })

  test('render blog title and author but nothing else initially', () => {
    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')

    expect(title).toBeDefined()
    expect(author).toBeDefined()

    const details = component.container.querySelector('.blog-details')
    expect(details).toBe(null)
  })

  test('view button click reveals likes and url', () => {
    const button = component.container.querySelector('.view-btn')
    fireEvent.click(button)

    const hide = component.getByText('hide')
    expect(hide).toBeDefined()

    const details = component.container.querySelector('.blog-details')
    expect(details).toBeDefined()
  })

  test('hide button click hides details', () => {
    const button = component.container.querySelector('.view-btn')
    fireEvent.click(button)

    const hide = component.getByText('hide')
    expect(hide).toBeDefined()
    fireEvent.click(hide)

    const details = component.container.querySelector('.blog-details')
    expect(details).toBe(null)
  })

  test('like button clicked twice and event handled is called twice', () => {

    const view = component.getByText('view')
    fireEvent.click(view)
    const like = component.container.querySelector(".like-btn")
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})
