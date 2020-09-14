import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [colorMessage,setColorMessage] = useState('green')

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setColorMessage('red')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setColorMessage('green')
      },5000)
    }
  }

  const handleLogout= () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addNewBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setMessage(null)
        },5000)
      })
  }

  const removeBlog = (id) => {
    blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const likeBlog = (id,newBlog) => {
    blogService
      .update(id,newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog ))
      })
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm addNewBlog={addNewBlog}/>
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} color={colorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              id='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              id='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id='login-button'>login</button>
        </form>
      </div>
    )
  }

  const listBlogs = blogs.sort((a,b) => b.likes-a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} color={colorMessage}/>
      <p>{user.name} logged in <button onClick={(event) => handleLogout(event)}>logout</button></p>
      {blogForm()}
      {listBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} likeBlog={likeBlog}/>
      )}
    </div>
  )
}

export default App