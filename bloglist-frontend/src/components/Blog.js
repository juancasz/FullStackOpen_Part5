import React,{ useState } from 'react'

const Blog = ({ blog,removeBlog,likeBlog }) => {
  const[visible,setVisible] = useState(false)
  const[label,setLabel] = useState('view')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display:visible? '':'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    if(visible){
      setLabel('view')
    }else{
      setLabel('hide')
    }
  }

  const likeThis = async() => {
    const newBlog={
      user:blog.user_id,
      likes:blog.likes+1,
      author:blog.author,
      title:blog.title,
      url:blog.url
    }

    likeBlog(blog.id,newBlog)
  }

  const removeThis = () => {
    const remove = window.confirm(`Delete ${blog.title} by ${blog.author}?`)
    if(remove){
      removeBlog(blog.id)
    }
  }

  return(
    <div style={blogStyle}>
      <div className='alwaysVisible'>
        {blog.title} {blog.author} <button onClick={toggleVisibility} data-cy='viewbutton'>{label}</button>
      </div>
      <div style={showWhenVisible} className='conditionalVisible'>
        <span>{blog.url}</span><br/>
        <span data-cy="likes">likes {blog.likes}</span> <button data-cy="buttonlike" onClick={likeThis}>like</button><br/>
        <span>{blog.author}</span><br/>
        <button style={{ backgroundColor:'blue' }} onClick={removeThis} data-cy='buttonremove'>remove</button>
      </div>
    </div>
  )
}

export default Blog
