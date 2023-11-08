const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Testing get(ting) blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned (2)', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
    
  test('one of the (default) blogs is about formula 1', async () => {
    const response = await api.get('/api/blogs')
    
    const titles = response.body.map(r => r.title)
  
    expect(titles).toContain(
      'Formula 1'
      )
  })

  test('identifying blogs is done with ids', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Post(ing) blogs to DB', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "async/await",
      author: "Simplifies Making",
      url: "www.async_calls.com",
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'async/await'
    )
  })
  
  test('blogs without titles are not added', async () => {
    const newBlog = {
      author: "Simplifies Making",
      url: "www.async_calls.com",
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })


  test('blogs without urls are not added', async () => {
    const newBlog = {
      title: "fake title",
      author: "Simplifies Making",
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })


  test('blogs without likes are set as 0 likes', async () => {
    const newBlog = {
      title: "test",
      author: "Simplifies Making",
      url: "www.async_calls.com",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[2].likes).toBe(0)
  })
})

describe('Id(entifying blogs)', () => {

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(resultBlog.body).toEqual(blogToView)
  })
  
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('Editing blogs', () => {
  test('likes of a blog can be edited', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToCompare = blogsAtStart[0]
    const oldLikes = blogToCompare.likes
  
    const newBlog = {
      likes: oldLikes * 2
    }

    await api
      .put(`/api/blogs/${blogToCompare.id}`)
      .send(newBlog)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(oldLikes * 2)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})