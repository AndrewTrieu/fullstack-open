const listHelper = require('../utils/list_helper')

const testBlogs = [
  {
    'title': 'My blog',
    'author': 'Andrew',
    'url': 'www.andrew.eu',
    'likes': 1000,
    'id': '64771b55a9c07824450982c5'
  },
  {
    'title': 'My blog',
    'author': 'Andrew',
    'url': 'www.andrew.eu',
    'likes': 3000,
    'id': '64771b89a9c07824450982c8'
  },
  {
    'title': 'Another blog 2',
    'author': 'Hans',
    'url': 'www.andrew.eu',
    'likes': 5000,
    'id': '64771caaa9c07824450982cb'
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('empty - zero', () => {
    expect(listHelper.sumLikes([])).toBe(0)
  })

  test('one correct', () => {
    expect(listHelper.sumLikes([testBlogs[0]])).toBe(1000)
  })

  test('sum correct', () => {
    expect(listHelper.sumLikes(testBlogs)).toBe(9000)
  })
})

test('favorite blog', () => {
  expect(listHelper.favoriteBlog(testBlogs)).toEqual(testBlogs[2])
})

test('most blogs', () => {
  expect(listHelper.mostBlogs(testBlogs)).toEqual({ author: 'Andrew', blogs: 2 })
})

test('most likes', () => {
  expect(listHelper.mostLikes(testBlogs)).toEqual({ author: 'Hans', likes: 5000 })
})