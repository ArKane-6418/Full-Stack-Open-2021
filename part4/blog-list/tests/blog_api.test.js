const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./blog_test_helper.js')
const app = require('../app')

const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('getting blogs data when authorized', () => {
  // Get the token before all tests so it's consistent
  // For tests involving authorization, we just set the Authorization to the bearer token
  beforeAll(async () => {
    const result = await api
      .post('/api/login')
      .send({
        "username": helper.initialUser.username,
        "password": helper.initialUser.password}
      )
    token = result.body.token
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('all blogs have an id property', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
    const result = response.body.map(r => r.id)
    expect(result[0]).toBeDefined()
  })

  test('fails with status 401 if unauthorized', async () => {
    const blogsAtStart = helper.initialBlogs
    const newBlog = { 'title': 'A Beautiful Day',
      'author': 'Michael Buble',
      'url': 'https://www.google.ca/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('adding a blog', () => {
  test('likes set to 0 if missing', async () => {
    const newBlog = { 'title': 'Just Haven\'t Met You Yet',
      'author': 'Michael Buble',
      'url': 'https://www.google.ca/',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).toContain(0)
  })


  test('add a valid blog', async () => {
    const newBlog = { 'title': 'Just Haven\'t Met You Yet',
      'author': 'Michael Buble',
      'url': 'https://www.google.ca/',
      'likes': 17000000
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('Just Haven\'t Met You Yet')

  })

  test('title/url missing from blog', async () => {
    const newBlog = { 'title': 'A Beautiful Day',
      'likes': 17000000
    }

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    expect(result.body.error).toContain("title, author, or url missing")
  })
})

describe('deleting a blog', () => {
  test('status code 204 if the id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
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
      .set('Authorization', `bearer ${token}`)
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

