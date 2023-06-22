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
      <form onSubmit={addBlog} className='form'>
        <div>
          Title:
          <input
            type="text"
            value={title}
            className="title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            className="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={urlAddress}
            className="urlAddress"
            onChange={(event) => setUrlAddress(event.target.value)}
          />
        </div>
        <button type="submit" className='createButton'>Create</button>
      </form>
    </div>
  )
}
