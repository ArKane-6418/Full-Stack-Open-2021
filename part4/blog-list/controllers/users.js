const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.username.length < 3) {
    return res.status(400).send({ error: "username length is too short, must be at least length 3"})
  }

  if (body.password.length < 3) {
    return res.status(400).send({ error: "password length is too short, must be at least length 3"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  jwt.verify(req.token, process.env.SECRET)
  const users = await User
    .find({})
    .populate('blogs', {url: 1, author: 1, title: 1})

  res.json(users)
})

module.exports = usersRouter
