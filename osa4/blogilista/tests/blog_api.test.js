const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(initialBlogs.length)
})
  
test('one of the blogs is about formula 1', async () => {
  const response = await api.get('/api/blogs')
  
  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'Formula 1'
    )
})

afterAll(async () => {
  await mongoose.connection.close()
})