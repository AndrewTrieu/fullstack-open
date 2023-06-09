import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog.js'
import { BlogForm } from './components/BlogForm.js'
import Notification from './components/Notification.js'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import Togglable from './components/Togglable.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const resetInputFields = () => {
    setUsername('')
    setPassword('')
  }

  const setNotification = (message, type) => {
    if (type === 'success') {
      setSuccessMessage(message)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } else if (type === 'error') {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    const loggedInUserLocal = window.localStorage.getItem('loggedInUser')

    if (loggedInUserLocal) {
      const user = JSON.parse(loggedInUserLocal)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      resetInputFields()
      setNotification('Login successful', 'success')
    } catch (exception) {
      setNotification('Wrong credentials', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      setNotification('Logout successful', 'success')
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      resetInputFields()
    } catch (exception) {
      setNotification('Logout failed', 'error')
    }
  }
  const newBlogRef = useRef()
  const handleNewBlog = (newBlog) => {
    newBlogRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        resetInputFields()
        setNotification(
          `A new blog ${returnedBlog.title} by ${returnedBlog.author} at ${returnedBlog.url} added`,
          'success'
        )
      })
      .catch((error) => {
        setNotification('Failed to add new blog: ' + error, 'error')
      })
  }

  const handleRemoveBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id))
          setNotification(
            `Blog ${blog.title} by ${blog.author} removed`,
            'success'
          )
        })
        .catch((error) => {
          setNotification('Failed to remove blog: ' + error, 'error')
        })
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} className="loginForm">
      <div>
        Username
        <input
          type="text"
          value={username}
          className="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          className="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className='loginButton'>Login</button>
    </form>
  )

  const blogForm = () => {
    return (
      <div>
        <p> {user.name} logged in </p>
        <button onClick={handleLogout} className='logoutButton'>Logout</button>
        <Togglable buttonLabel="New blog" ref={newBlogRef}>
          <BlogForm createBlog={handleNewBlog} />
        </Togglable>
        <h2> All blogs</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setNotification={setNotification}
              removeBlog={handleRemoveBlog}
            />
          ))}
      </div>
    )
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      {user === null ? (
        <div>
          <p> Please log in </p>
          {loginForm()}
        </div>
      ) : (
        <div>{blogForm()}</div>
      )}
    </div>
  )
}

export default App
