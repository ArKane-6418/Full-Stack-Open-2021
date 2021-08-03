// A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,”
// capable only of performing middleware and routing functions. Every Express application has a built-in app router.
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  // We will use a Bearer auth token
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    // We take substring starting at index 7, meaning everything except bearer
    return authorization.substring(7)
  }
  // Return null if auth fails
  return null
}

notesRouter.get('/', async (request, response) => {
  // If we want to call several async functions, they'd all have to be made in the callback
  // async/await fixes that problem for us

  // Execution of code pauses at const notes and waits until the promise is fulfilled
  // Mongoose join is accomplished using multiple queries, but we can't guarantee the state of the collection is consistent

  const notes = await Note.find({})
    // We specify the ids referencing note objects in the notes field will be replaced by the note documents
    .populate('user', { username: 1, name: 1 })
  // We specify what fields of the note documents in include
  response.json(notes)
})

// Fetch a single resource
// Handles all GET requests that are of form api/notes/SOMETHING

notesRouter.get('/:id', async (request, response, next) => {

  const note = await Note.findById(request.params.id)
  // Error check the validity of the note
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

})

notesRouter.post('/', async (request, response, next) => {

  const body = request.body

  // Isolate the token from the auth header
  const token = getTokenFrom(request)

  // Check validity of token and return the object the token was based on (our object with username and id)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  // If either the token or decodedToken id are null, return 401 unauthorized error
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // Main issue with token auth is the API has blind trust to the holder. What if access has to be revoked?
  // Two solutions:
  // 1. Limit validity period of a token, meaning users have to re-login to get a new token
  // 2. Save info about token to db and check validity of access rights for each request (server-side)
  // Common to save the session of a token to a key-value db such as Redis
  // Cookies are used for transferring the token between client and server
  const user = await User.findById(decodedToken.id)

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()

  // User object changes so id of the node is stored in the notes field
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.json(savedNote)

})

// PUT request

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  response.json(updatedNote)
})

// DELETE request

notesRouter.delete('/:id', async (request, response, next) => {

  await Note.findByIdAndRemove(request.params.id)
  // 204 status code means no content
  response.status(204).end()
})

module.exports = notesRouter