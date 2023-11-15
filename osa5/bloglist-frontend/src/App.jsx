import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const blogFromRef = useRef()

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
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } 
    catch (exception) {
      setIsError(true)
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging user out')

    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (blogObject) => {
    blogFromRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
  }

  const updateBlog = async (blogObject) => {
    const id = blogObject.id

    await blogService.update(id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : blogObject))
  }

  const removeBlog = async (blogObject) => {
    const id = blogObject.id

    if (window.confirm(`Remove blog "${blogObject.title}" by ${blogObject.author}`)) {
      await blogService.remove(id, blogObject)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input 
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>  
  )

  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={blogFromRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} setIsError={setIsError} setMessage={setMessage}/>
      </Togglable>
    )
  }

  const sortBlogs = (blogs) => {
    const unsortedblogs = blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog} />)
    return unsortedblogs.sort((a, b) => b.props.blog.likes - a.props.blog.likes)
  }

  if (user === null) {
    return(
      <div>
        <h2>log in to application</h2>
        <Notification message={message} error={isError}/>
        {!user && loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={isError}/>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogForm()}
      {sortBlogs(blogs)}
    </div>
  )
}

export default App