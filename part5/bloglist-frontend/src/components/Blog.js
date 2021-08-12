import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, user }) => {

  // Have a visibility toggle for the view button
  const [visible, setVisible] = useState(false)

  const showRemove = (user && user.username && blog.user && blog.user.username) && user.username === blog.user.username
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeUpdate = () => {
    handleUpdateBlog(blog)
  }

  const handleRemoveClick = () => {
    const deleteBlog = window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)
    if (deleteBlog) {
      handleDeleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className="title">Title: {blog.title}</div>
      <div className="author">Author: {blog.author}</div>
      <button
        className="view-btn"
        onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible &&
      <div className="blog-details">
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes} <button className="like-btn" onClick={handleLikeUpdate}>like</button></div>
        <div>Username: {blog.user && blog.user.username}</div>
        {showRemove && <button className='remove-btn' onClick={handleRemoveClick}>remove</button>}
      </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog