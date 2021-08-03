const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  { 'title': 'Moby Dick',
    'author': 'Ernest Hemmingway',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 1000,
    'user': '61086fbad5a30d05282838bc'
    },
  { 'title': 'I don\'t know',
    'author': 'Me',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 150,
    'user': '61086fbad5a30d05282838bc'
    }
]

const initialUser = {"username": "root",
  "name": "Joshua",
  "password": "secret"}

// Creating a db object ID that doesn't belong to any blog object in the db
const nonExistingId = async () => {
  const blog = new Blog({ 'title': 'I know',
      'author': 'Me',
      'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
      'likes': 150,
      }
  )
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

// Returns all blogs mapped as JSON
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb, initialUser
}