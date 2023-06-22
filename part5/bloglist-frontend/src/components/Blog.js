import { useState } from 'react'
import blogService from '../services/blogs.js'
import Togglable from './Togglable.js'

const Blog = ({ blog, setNotification, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [likes, setLikes] = useState(blog.likes)

  const handleLike = (blog) => {
    blog.likes = blog.likes + 1
    blogService
      .update(blog.id, blog)
      .then((returnedBlog) => {
        setLikes(returnedBlog.likes)
        setNotification(`You liked ${blog.title}`, 'success')
      })
      .catch((error) => {
        setNotification(`Like failed. Error: ${error}`, 'error')
      })
  }

  const findUser = async (blogId) => {
    const blogs = await blogService.getAll()
    const blogToFind = blogs.filter((blog) => blog.user).find((blog) => blog.id === blogId)

    blog.user = blogToFind?.user
  }

  findUser(blog.id)

  return (
    <div style={blogStyle} className="blog">
      <div>
        <em>
          {blog.title} by {blog.author}
        </em>
        <Togglable buttonLabel="View" className="blogButton">
          <ul>
            <li>User: {blog.user?.name || 'Unknown' }</li>
            <li> URL: {blog.url}</li>
            <li>
              {likes} likes&nbsp;
              <button onClick={() => handleLike(blog)}>+</button>
            </li>
          </ul>
          <button onClick={() => removeBlog(blog)}>Remove</button>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
