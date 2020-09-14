import React, { useState } from 'react'

const BlogForm = ({ addNewBlog }) =>  {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    addNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
                title:
        <input
          type="text"
          name="title"
          className="title"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
                author:
        <input
          type="text"
          name="author"
          className='author'
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
                url:
        <input
          type="text"
          name="url"
          className='url'
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">create</button><br/>
    </form>
  )
}

export default BlogForm