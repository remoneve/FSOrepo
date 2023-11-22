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
  const [infoButton, setInfoButton] = useState('View')

  const infoVisible = { display: visible ? '' : 'none' }

  const removeVisible = { display: showRemove ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    loggedIn()
    if (visible) {
      setInfoButton('View')
    }
    else setInfoButton('Hide')
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

  const handleRemove = () => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, {blog.author}
        <button onClick={toggleVisibility}>{infoButton}</button>
      </div>
      <div data-testid="showInfo" style={infoVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={addLike}>like</button></div>
        <div>{blog.user.name || user.name}</div>
        <div style={removeVisible}><button onClick={handleRemove}>remove</button></div>
      </div>
    </div>
  )
}

export default Blog