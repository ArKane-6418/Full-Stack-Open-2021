import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    createBlog(blogObject)

  }
  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            value={newTitle}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            value={newAuthor}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            value={newUrl}
            onChange={({ target }) => setUrl(target.value)}
          />

          <button type="submit">Create Blog</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm