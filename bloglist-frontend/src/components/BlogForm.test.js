import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent  } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm state is updated after submiting the form',() => {
  const addNewBlog= jest.fn()

  const component = render(
    <BlogForm addNewBlog={addNewBlog}/>
  )

  const title = component.container.querySelector('.title')
  const author = component.container.querySelector('.author')
  const url = component.container.querySelector('.url')
  const form = component.container.querySelector('form')

  fireEvent.change(title,{
    target: { value: 'title for test' }
  })

  fireEvent.change(author,{
    target: { value: 'author for test' }
  })

  fireEvent.change(url,{
    target: { value: 'http://test.com' }
  })

  fireEvent.submit(form)

  expect(addNewBlog.mock.calls).toHaveLength(1)
  expect(addNewBlog.mock.calls[0][0].title).toBe('title for test')
  expect(addNewBlog.mock.calls[0][0].author).toBe('author for test')
  expect(addNewBlog.mock.calls[0][0].url).toBe('http://test.com')
})