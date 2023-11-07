const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.laki1t5.mongodb.net/testBlogApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: "Rahasäiliö 2",
    author: "Aku Ankka",
    url: "www.google.com",
    likes: 10
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})