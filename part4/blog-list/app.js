const mongoose = require('mongoose')
const config = require('./utils/config')
require('express-async-errors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const express = require('express')
require('express-async-errors')
const blogRouter = require('./controllers/blog-routes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()
const cors = require('cors')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// Token extractor must come before routes
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
