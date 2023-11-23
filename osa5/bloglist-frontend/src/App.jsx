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
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
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
    const newBlog = await blogService.create(blogObject)
    blogObject.id = newBlog.id
    setBlogs(blogs.concat(blogObject))
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
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={blogFromRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} setIsError={setIsError} setMessage={setMessage} user={user}/>
      </Togglable>
    )
  }

  const sortBlogs = (blogs) => {
    const unsortedblogs = blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} />)
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