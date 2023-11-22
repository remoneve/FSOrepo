
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
  username: 'testuser',
  name: 'testuser'
}

const blog = {
  title: 'Testing components',
  author: 'Tester Person',
  url: 'www.nourl.com',
  likes: 15,
  user: user
}

describe('testing titles and other text', () => {
  beforeEach(() => {
    render(<Blog blog={blog} user={user} updateBlog={() => {}} removeBlog={() => {}}/>)
  })
  
  test('a title and an author are rendered', () => {
    screen.getByText('Testing components, Tester Person')
  })
  
  test('url or likes are not rendered', async () => {
    const element = await screen.findByTestId('showInfo')
    expect(element).toHaveStyle('display: none')
  })
  
  test('url, likes and name of user are rendered after clicking "show"', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('View')
  
    await user.click(showButton)
  
    const element = await screen.findByTestId('showInfo')
    screen.getByText('www.nourl.com')
    screen.getByText('likes 15')
    screen.getByText('testuser')
  })
})

test('clicking like twice causes two calls', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} updateBlog={mockHandler} removeBlog={() => {}}/>)
  
  const renderUser = userEvent.setup()

  const showButton = screen.getByText('View')
  await renderUser.click(showButton)

  const likeButton = screen.getByText('like')

  await renderUser.click(likeButton)
  await renderUser.click(likeButton)

  expect(mockHandler).toBeCalledTimes(2)
})