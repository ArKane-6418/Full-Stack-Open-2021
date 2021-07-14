const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

// Wrap app in superagent object, assigned to api variable and tests can use it for making HTTP requests
const api = supertest(app)
const Note = require('../models/note')

// Clear out the database then save the initialNotes to it

beforeEach(async () => {
  // Problem with this: every iteration of forEach creates a new async operation and beforeEach won't wait for them

  /* await Note.deleteMany({})
  console.log("cleared")
  helper.initialNotes.forEach(async (note) => {
    let noteObject = new Note(note)
    // Not in the beforeEach function, but separate functions
    await noteObject.save()
    console.log("saved")
  })
  console.log("done")
  */
  // Correct solution
  await Note.deleteMany({})

  // Array of Mongoose objects
  const noteObjects = helper.initialNotes
    .map(note => new Note(note))

  // Array of save promises
  const promiseArray = noteObjects.map(note => note.save())

  // Promise.all transforms an array of promises into a single promise that will be fulfilled once every promise inside
  // it is resolved
  await Promise.all(promiseArray)
})

describe('initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(2)
  })

  test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    expect(response.body[0].content).toBe('HTML is easy')
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)

    // We expect the contents array to contain that string
    expect(contents).toContain(
      'Browser can execute only Javascript'
    )
  })
})

describe('a specific note can be viewed', () => {
  test('succeeds with valid id', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resultNote.body).toEqual(processedNoteToView)
  })

  test('fails with status code 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with status 400 if id is invalid', async () => {
    const invalidId = '30238402348204'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(r => r.content)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('fails with status code 400 if data is invalid', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
    const contents = notesAtEnd.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)
  })

})


afterAll(() => {
  mongoose.connection.close()
})