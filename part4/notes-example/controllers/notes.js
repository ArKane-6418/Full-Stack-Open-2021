// A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,”
// capable only of performing middleware and routing functions. Every Express application has a built-in app router.
const notesRouter = require('express').Router()
const Note = require('../models/note')

// Calling send makes the server respond to the HTTP request by sending a response containing <h1>Hello World!</h1>
// Since it's in a string, express sets the value of Content-Type header to text/html
// Status code defaults to 200

notesRouter.get('/', async (request, response) => {
  // Send notes array as JSON formatted string, express sets Content-Type to application/json
  // Recall that all the code we want to execute once the promise is returned is written in the callback function
  // If we want to call several async functions, they'd all have to be made in the callback
  // async/await fixes that problem for us

  // Execution of code pauses at const notes and waits until the promise is fulfilled
  const notes = await Note.find({})
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
  // Body is an object, so we should specify that certain properties cannot be empty, such as content
  // POST request allows users to add objects with arbitrary properties, so we only take the ones we need

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  const savedNote = await note.save()
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