const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  blogs = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...likes)
  return blogs.filter(blog => blog.likes = maxLikes)[0]
}

// We want to use this function for mostBlogs and mostLikes
// We pass in the array and the corresponding key
// prev starts at index 0 and curr starts at index 1, the result of the first call gets put into prev
const getObjectMaxVal = (arr, key) => {
  return arr.reduce((prev, curr) => {
    return (prev[key] > curr[key]) ? prev : curr
  })
}
const mostBlogs = (blogs) => {
  // Use a reduce function to get the authors and the number of blogs they've authored
  const authorAndBlogs = blogs.reduce((acc, current) => {
    // acc start off as an empty array and current starts at the first index
    // If the array contains the author of the current blog, we just increase the blog count by 1
    if (acc[current.author]) {
      acc[current.author]['blogs'] = acc[current.author]['blogs'] + 1
    }
    // Otherwise, we create a new object with the author and one blog, then transfer the contents to accumulator
    else {
      const author = {
        author: current.author,
        blogs: 1
      }
      acc[current.author] = { ...author }
    }
    // Return the modified array and keep returning it until the reducer finishes
    return acc
  })
  return getObjectMaxVal(Object.values(authorAndBlogs), 'blogs')
}

const mostLikes = (blogs) => {
  const authorAndLikes = blogs.reduce((acc, current) => {
    // acc start off as an empty array and current starts at the first index
    // If the array contains the author of the current blog, we just increase the likes acount
    if (acc[current.author]) {
      acc[current.author]['likes'] += current.likes
    }
    // Otherwise, we create a new object with the author and current likes, then transfer the contents to accumulator
    else {
      const author = {
        author: current.author,
        likes: current.likes
      }
      acc[current.author] = { ...author }
    }
    // Return the modified array and keep returning it until the reducer finishes
    return acc
  })
  return getObjectMaxVal(Object.values(authorAndLikes), 'likes')
}
module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }