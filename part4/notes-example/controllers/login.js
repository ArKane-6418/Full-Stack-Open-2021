const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  // Get the user from the posted username and check the validity of the password
  const body = request.body

  const user = await User.findOne({ username: body.username })

  // Verify the correctness of the password
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    // 401 unauthorized
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  // When the token gets decoded, this gets returned
  const userForToken = {
    username: user.username,
    id: user._id
  }

  // Digital signature of the token is held in SECRET env var, and
  // ensures that only parties who know the secret can generate valid token

  // API has blind trust to token holder, what if the access rights should be revoked?
  // Implement a validity period, once it expires, user has to gen a new one by logging in again

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name})
})

module.exports = loginRouter