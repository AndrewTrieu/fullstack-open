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
    likes: body.likes || 0
  })).save()

  response.status(201).json(blog)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) response.json(blog)
  else response.status(404).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = await Blog.findByIdAndUpdate(request.params.id, {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }, { new: true })

  response.status(200).json(blog)
})

module.exports = blogsRouter