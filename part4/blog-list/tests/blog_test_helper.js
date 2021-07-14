const Blog = require('../models/blog')

const initialBlogs = [
  { 'title': 'Moby Dick',
    'author': 'Ernest Hemmingway',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 1000 },
  { 'title': 'I don\'t know',
    'author': 'Me',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 150 }
]

// Creating a db object ID that doesn't belong to any blog object in the db
const nonExistingId = async () => {
  const blog = new Blog({ 'title': 'I know',
    'author': 'Me',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 150 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

// Returns all blogs mapped as JSON
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}