import { useState } from 'react'

export const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [urlAddress, setUrlAddress] = useState('')

  const resetInputFields = () => {
    setTitle('')
    setAuthor('')
    setUrlAddress('')
  }

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: urlAddress,
    })
    resetInputFields()
  }

  return (
    <div>
      <h2> Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={urlAddress}
            name="urlAddress"
            onChange={(event) => setUrlAddress(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
