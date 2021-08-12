const blogRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')

const verify = (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' })
  }

  return decodedToken
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const user = request.user

  if (!token || !user.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

  if (!body.title || !body.url || !body.author) {
    return response.status(400).json({ error: "title, author, or url missing"})
  }
  const blog = new Blog(
    {
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes,
      user: user._id
    })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  // Make sure to save the user after concatenating the blog id
  // Blog id is how mongoose knows that the schema type is Blog
  await user.save()
  const populatedBlog = await savedBlog
    .populate('user', {username: 1, name: 1})
    .execPopulate()
  response.status(201).json(populatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  console.log(blog.user)
  console.log(user.id)
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(403).json({ error: "Only the creator can delete this blog"})
  }
  user.blogs = user.blogs.filter(b => b.id.toString() !== blog.id.toString())
  await blog.remove()
  await user.save()
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  verify(request, response)
  const body = request.body
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter
