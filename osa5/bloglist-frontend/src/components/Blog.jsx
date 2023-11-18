import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [showRemove, setShowRemove] = useState(true)

  const infoVisible = { display: visible ? '' : 'none' }
  const infoHidden = { display: visible ? 'none' : '' }

  const removeVisible = { display: showRemove ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    loggedIn()
  }

  const loggedIn = () => {
    if (user.username === blog.user.username) {
      setShowRemove(true)
    }
    else setShowRemove(false)
  }

  const addLike = () => {
    const newBlog = ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
      id: blog.id
    })

    updateBlog(newBlog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div className='blog' style={infoHidden}>
        <div>
          {blog.title}, {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={infoVisible}>
        <div>{blog.title}, {blog.author} <button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={addLike}>like</button></div>
        <div>{blog.user.name || user.name}</div>
        <div style={removeVisible}><button onClick={remove}>remove</button></div>
      </div>
    </div>
  )
}

export default Blog