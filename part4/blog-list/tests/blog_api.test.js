const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_test_helper')
const app = require('../app')

const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('getting blogs data', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('all blogs have an id property', async () => {
    const response = await api.get('/api/blogs')
    const result = response.body.map(r => r.id)
    expect(result[0]).toBeDefined()
  })
})

describe('adding a blog', () => {
  test('likes set to 0 if missing', async () => {
    const newBlog = { 'title': 'A Beautiful Day',
      'author': 'Michael Buble',
      'url': 'https://www.google.ca/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).toContain(0)

  })


  test('add a valid blog', async () => {
    const newBlog = { 'title': 'A Beautiful Day',
      'author': 'Michael Buble',
      'url': 'https://www.google.ca/',
      'likes': 17000000
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('A Beautiful Day')

  })

  test('title/url missing from blog', async () => {
    const newBlog = { 'title': 'A Beautiful Day',
      'likes': 17000000
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting a blog', () => {
  test('status code 204 if the id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain('Moby Dick')

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('updating an existing blog', () => {
  test('status code 200 upon successful update', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[1]

    const newBlog = { 'title': 'A Beautiful Day',
      'author': 'Michael Buble',
      'url': 'https://www.google.ca/',
      'likes': 17000000
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('A Beautiful Day')

  })
})

afterAll(() => {
  mongoose.connection.close()
})

