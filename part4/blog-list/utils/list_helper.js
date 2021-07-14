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
module.exports = { dummy, totalLikes, favouriteBlog }