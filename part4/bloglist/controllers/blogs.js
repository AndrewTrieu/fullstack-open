const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = await (new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })).save()

  response.status(201).json(blog)

})

module.exports = blogsRouter