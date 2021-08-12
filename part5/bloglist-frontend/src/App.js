import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import './index.css'

const App = () => {
  const blogFormRef = useRef()
  const [flag, setFlag] = useState('success')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const filteredBlogs = blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setFlag('success')
      setNotificationMessage(`Blog '${createdBlog.title}' added`)
      setUser(user)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setFlag('error')
      setNotificationMessage(`${exception}`)
      setTimeout(() => {
        setFlag('success')
        setNotificationMessage(null)
      }, 5000)
    }

  }

  const blogForm = () => (
    <Toggleable buttonLabel="Create New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Toggleable>
  )

  const handleUpdateBlog = async blogObject => {
    try {
      const updatedBlog = await blogService.updateBlog(blogObject.id, { ...blogObject, likes: blogObject.likes+1 })
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b))
      setNotificationMessage(`Added a like to '${updatedBlog.title}'`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setFlag('error')
      setNotificationMessage(`${exception}`)
      setTimeout(() =>  {
        setFlag('success')
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id)
      setNotificationMessage(`Blog '${blog.title}' deleted`)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setFlag('error')
      setNotificationMessage(`${exception}`)
      setTimeout(() =>  {
        setFlag('success')
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // Make sure this is awaited and handleLogin is async
      const user = await loginService.login(
        {
          username, password
        }
      )
      console.log('user', user.username)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setFlag('error')
      setNotificationMessage(`${exception.response.data.error}`)
      setTimeout(() => {
        setFlag('success')
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    console.log(user.username)
    setUser(null)
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  const loginForm = () => (
    <Toggleable buttonLabel="Log In">
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    </Toggleable>
  )

  return (
    <div>
      {user === null &&
    <div>
      <Notification message={notificationMessage} flag={flag}/>
      {loginForm()}
    </div>
      }
      {user !== null &&
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      {logoutForm()}
      <Notification message={notificationMessage} flag={flag}/>
      {blogForm()}
      {filteredBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdateBlog={handleUpdateBlog}
          handleDeleteBlog={handleDeleteBlog}
          user={user}/>
      )}
    </div>
      }
    </div>
  )
}

export default App