const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Frisbeegolf",
        author: "Paul McBeth",
        url: "www.discgolfnetwork.com",
        likes: 200
      }, 
      {
        title: "Formula 1",
        author: "James Hunt",
        url: "www.formula1.com",
        likes: 10
      }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb
}