const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./blog_test_helper.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when there is one user in the db', () => {
  beforeAll(async () => {
    // Clear the db before testing for one user
    await User.deleteMany({})

    // Create basic user
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
      username: "root",
      name: "Joshua",
      passwordHash
    })
    await user.save()
  })
  // Start testing

  test('attempt to add a user with an existing username', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: "root",
      password: "30rnhoughiure"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('add user with username of length < 3', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: "pt",
      password: "3093232rvfdre"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain("username length is too short")
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('add user with password of length < 3', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: "Ark",
      password: "30"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain("password length is too short")
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating a valid user', async () => {

    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: "ArKane",
      password: "3093232rvfdre"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

})

afterAll(() => {
  mongoose.connection.close()
})