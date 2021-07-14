const mongoose = require('mongoose')
const config = require('./utils/config')
require('express-async-errors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const express = require('express')
const blogRouter = require('./controllers/blog-routes')
const app = express()
const cors = require('cors')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
