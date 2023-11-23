import { useState } from 'react'

const BlogForm = ({ createBlog, setIsError, setMessage, user }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    console.log('adding a new blog with', newTitle, newAuthor, newUrl)

    try {
      await createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: 0,
        user: user
      })

      setIsError(false)
      setMessage(`a new blog (${newTitle}) by ${newAuthor} added`)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception) {
      setIsError(true)
      setMessage(exception.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>title: <input id="title" value={newTitle} onChange={event => setNewTitle(event.target.value)} data-testid="title"/></div>
        <div>author: <input id="author" value={newAuthor} onChange={event => setNewAuthor(event.target.value)} data-testid="author"/></div>
        <div>url: <input id="url" value={newUrl} onChange={event => setNewUrl(event.target.value)} data-testid="url"/></div>
        <button id="save-button" type="submit">save</button>
      </form>
    </div>
  )
}


export default BlogForm