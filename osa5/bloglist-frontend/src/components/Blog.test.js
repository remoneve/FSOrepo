/* eslint-disable */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, separated by a', () => {
  const blog = {
    title: 'Testing components',
    author: 'Tester Person',
    url: 'www.nourl.com',
    likes: 15,
    user: ({
      username: 'testuser',
      name: 'testuser'
    })
  }

  const { container }= render(<Blog blog={blog}/>)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Testing components, Tester Person')
})

/*test('renders url, likes and a user, after pressing show', async () => {
    const blog = {
      title: 'Testing buttons',
      author: 'Silly Tester',
      url: 'www.tested.com',
      likes: 300,
      user: ({
        username: 'test',
        name: 'tester'
      })
    }
  
    const appUser = {
        username: 'test',
        name: 'tester'
    }

    const mockHandler = jest.fn()
  
    const { container } = render(<Blog blog={blog} toggleVisibility={mockHandler} user={appUser} />)

    screen.debug(container)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    screen.getByText('www.tested.com')
    screen.getByText('likes 300')
  })

/*test('clicking the button calls event handler once', async () => {
    const testUser = {
        username: 'test',
        name: 'tester'
      }
    
    const blog = {
        title: 'Testing buttons',
        author: 'Incredible Tester',
        url: 'www.test.com',
        likes: 0,
        user: testUser
      }
  
    const mockHandler = jest.fn()
  
    render(
        <Blog blog={blog} toggleVisibility={mockHandler} user={testUser} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  }) */