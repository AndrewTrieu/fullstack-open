const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'My blog',
    author: 'Andrew',
    url: 'www.andrew.eu',
    likes: 1000,
  },
  {
    title: 'My blog 2',
    author: 'Andrew',
    url: 'www.andrew.eu',
    likes: 3000,
  },
  {
    title: 'Another blog',
    author: 'Hans',
    url: 'www.andrew.eu',
    likes: 5000,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Test',
    author: 'tester',
    url: 'www.test.eu',
    likes: 999,
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}