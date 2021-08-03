const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require("../models/user")

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    // Replace user id with user object and show username and name
    .populate('notes', { content: 1, date: 1 })

  // The database does not actually know that the ids stored in the user field of notes
  // reference documents in the user collection

  //
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10

  // Password sent to request is not stored in the db, we store hash of the password using bcrypt.hash
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter