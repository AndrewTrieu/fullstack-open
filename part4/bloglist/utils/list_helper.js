const dummy = (blogs) => {
  return 1
}

const sumLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const uniqueAuthors = [...new Set(authors)]
  const authorBlogs = uniqueAuthors.map(author => {
    return { author: author, blogs: authors.filter(a => a === author).length }
  })
  return authorBlogs.reduce((max, author) => max.blogs > author.blogs ? max : author)
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const uniqueAuthors = [...new Set(authors)]
  const authorLikes = uniqueAuthors.map(author => {
    return { author: author, likes: blogs.filter(blog => blog.author === author).reduce((sum, blog) => sum + blog.likes, 0) }
  })
  return authorLikes.reduce((max, author) => max.likes > author.likes ? max : author)
}

module.exports = {
  dummy,
  sumLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}