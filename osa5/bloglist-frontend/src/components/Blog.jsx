import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, removeBlog }) => {
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
  const [likes, setLikes] = useState(blog.likes)

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

  const addLike = async () => {
    blog.likes += 1

    await blogService.update(blog.id, blog)
    setLikes(blog.likes)
  }

  const handleRemove = () => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, {blog.author}
        <button id="view-button" onClick={toggleVisibility}>{infoButton}</button>
      </div>
      <div data-testid="showInfo" style={infoVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button id="like-button" onClick={addLike}>like</button></div>
        <div>{blog.user.name || user.name}</div>
        <div style={removeVisible}><button onClick={handleRemove}>remove</button></div>
      </div>
    </div>
  )
}

export default Blog