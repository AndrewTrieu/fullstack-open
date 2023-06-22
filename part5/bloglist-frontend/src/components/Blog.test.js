import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from './Blog'
import { BlogForm } from './BlogForm'

const testSubject = {
  blog: {
    id: '62e5309ba56f29d013ebe184',
    author: 'Andrew Trieu',
    title: 'How to be a good programmer',
    url: 'https://lmgtfy.app/',
    likes: 10000000,
    user: {
      username: 'andyyyyy',
      name: 'Andrew Trieu',
    },
  },
}

describe('test for blogs', () => {
  test('blog\'s title and author is rendered, but not url or likes', () => {
    const { container } = render(
      <Blog blog={testSubject.blog}/>
    )

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('How to be a good programmer by Andrew Trieu')
  })

  test('blog\'s url and likes are rendered when button is clicked', async () => {
    render(<Blog blog={testSubject.blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('How to be a good programmer by Andrew Trieu')
    await user.click(button)

    const url = screen.getByText('https://lmgtfy.app/')
    expect(url).toBeDefined()

    const likes = screen.getByText('10000000')
    expect(likes).toBeDefined()
  })

  test('clicking the like button twice calls event handler twice', async () => {
    // Blog does not have updateBlog function
    const mockHandler = jest.fn()

    render(<Blog blog={testSubject.blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('How to be a good programmer by Andrew Trieu')
    await user.click(button)

    const likeButton = screen.getByText('+')
    await user.click(likeButton)
    await user.click(likeButton)

    // 3 times because the blog is viewed once and the like button is clicked twice
    expect(mockHandler.mock.calls).toHaveLength(3)
  })

  test('new blog form calls event handler with correct details', async () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog}/>
    )

    const user = userEvent.setup()

    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')
    const url = component.container.querySelector('.urlAddress')
    const form = component.container.querySelector('.form')

    await user.type(title, 'How to be a good programmer')
    await user.type(author, 'Andrew Trieu')
    await user.type(url, 'https://lmgtfy.app/')
    await user.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('How to be a good programmer')
    expect(createBlog.mock.calls[0][0].author).toBe('Andrew Trieu')
    expect(createBlog.mock.calls[0][0].url).toBe('https://lmgtfy.app/')
  })
})
