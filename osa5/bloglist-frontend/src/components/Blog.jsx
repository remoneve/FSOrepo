import { useState } from "react"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const infoVisible = { display: visible ? '' : 'none' }
  const infoHidden = { display: visible ? 'none' : '' }
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  console.log(blog.user)

  return (
    <div style={blogStyle}>
      <div style={infoHidden}>
        <div>
          {blog.title}, {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={infoVisible}>
        <div>{blog.title}, {blog.author} <button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.user.name}</div>
      </div>
   </div>
  ) 
}

export default Blog