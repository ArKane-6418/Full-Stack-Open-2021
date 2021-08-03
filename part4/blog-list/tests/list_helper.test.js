const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favouriteBlog = require('../utils/list_helper').favouriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

const listOneBlog = [
  { 'title': 'Moby Dick',
    'author': 'Ernest Hemmingway',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 1000 }
]

const listTwoBlog = [
  { 'title': 'Moby Dick',
    'author': 'Ernest Hemmingway',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 1000 },
  { 'title': 'I don\'t know',
    'author': 'Me',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 150 }
]

const listTwoBlogSameLike = [
  { 'title': 'Moby Dick',
    'author': 'Ernest Hemmingway',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 1000 },
  { 'title': 'I don\'t know',
    'author': 'Me',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 1000 },
  { 'title': 'I know',
    'author': 'Me',
    'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
    'likes': 150 }
]

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
  test('total likes on empty list', () => {

    expect(totalLikes([])).toBe(0)
  })

  test('total likes on list of one', () => {
    expect(totalLikes(listOneBlog)).toBe(1000)
  })

  test('total likes on list of several', () => {
    expect(totalLikes(listTwoBlog)
    ).toBe(1150)
  })
})

describe('favourite blog', () => {

  test('list of one blog, return that blog', () => {
    expect(favouriteBlog(listOneBlog)).toEqual(
      { 'title': 'Moby Dick',
        'author': 'Ernest Hemmingway',
        'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
        'likes': 1000 })
  })

  test('list of two blogs', () => {
    expect(favouriteBlog(listTwoBlog)).toEqual(
      { 'title': 'Moby Dick',
        'author': 'Ernest Hemmingway',
        'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
        'likes': 1000 })
  })

  test('list of two blogs, same likes', () => {
    expect(favouriteBlog(listTwoBlogSameLike)).toEqual(
      { 'title': 'Moby Dick',
        'author': 'Ernest Hemmingway',
        'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
        'likes': 1000 })
  })
})

describe('mostBlogs', () => {
  test('Two authors blogs', async () => {
    expect(mostBlogs(listTwoBlogSameLike)).toEqual({ author: 'Me', blogs: 2})
  })
})

describe('mostLikes', () => {
  test('Two authors likes', async () => {
    const listTwoBlogSameLike = [
      { 'title': 'Moby Dick',
        'author': 'Ernest Hemmingway',
        'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
        'likes': 1000 },
      { 'title': 'I don\'t know',
        'author': 'Me',
        'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
        'likes': 1000 },
      { 'title': 'I know',
        'author': 'Me',
        'url': 'https://www.youtube.com/watch?v=VEJJnEtQwKs',
        'likes': 150 }
    ]

    expect(mostLikes(listTwoBlogSameLike)).toEqual({ author: 'Me', likes: 1150})
  })
})