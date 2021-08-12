// If Cypress tests need to be able to modify server's db, ideally the db should be the same each tim we run tests
// However E2E tests do not have access to db, so we create API endpoints to the backend to test

const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router