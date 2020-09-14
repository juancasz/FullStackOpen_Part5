import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent  } from '@testing-library/react'
import Blog from './Blog'

describe('test for Blog',() => {
  let component
  beforeEach(() => {
    component = render(<Blog blog={blog} removeBlog={mockHandlerRemove} likeBlog={mockHandlerLike}/>)
  })
  const blog = {
    author: 'Juan',
    title: 'Testing the Blog',
    url: 'http://blog-test.com',
    likes: 0
  }
  const mockHandlerRemove = jest.fn()
  const mockHandlerLike = jest.fn()

  test('Default state: only title and author are displayed',() => {
    const visible = component.container.querySelector('.alwaysVisible')
    const hidden = component.container.querySelector('.conditionalVisible')

    expect(visible).toHaveTextContent(blog.title)
    expect(visible).toHaveTextContent(blog.author)
    expect(visible).not.toHaveStyle('display: none')
    expect(hidden).toHaveStyle('display: none')
  })

  test('The view button is working',() => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const revealed = component.container.querySelector('.conditionalVisible')
    expect(revealed).not.toHaveStyle('display:none')
    expect(revealed).toHaveTextContent(blog.url)
    expect(revealed).toHaveTextContent(blog.likes)
  })

  test('clicking the like button twice calls event handler passed as a prop twice',() => {
    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
})