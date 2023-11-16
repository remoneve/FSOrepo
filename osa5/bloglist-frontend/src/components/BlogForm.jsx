import { useState } from "react"

const BlogForm = ({ createBlog, setIsError, setMessage, user }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        console.log('adding a new blog with', newTitle, newAuthor, newUrl)

        console.log(user)
        try {
            await createBlog({
                title: newTitle,
                author: newAuthor,
                url: newUrl,
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
            setMessage('title or url missing')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
    }
        return (
            <div>
                <form onSubmit={addBlog}>
                    <div>title: <input value={newTitle} onChange={event => setNewTitle(event.target.value)}/></div>
                    <div>author: <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)}/></div>
                    <div>url: <input value={newUrl} onChange={event => setNewUrl(event.target.value)}/></div>
                <button type="submit">save</button>
                </form>
            </div>
        )
}


export default BlogForm