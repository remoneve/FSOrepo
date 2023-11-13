/* eslint-disable no-undef */
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')


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

  test('all blogs are returned (2 blogs)', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('one of the blogs is about formula 1', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain('Formula 1')
  })
})


describe('Post(ing) blogs to DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('a valid blog can be added', async () => {
    const loginUser = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)

    const token = await result.body.token

    const newBlog = {
      title: 'A valid blog',
      author: 'An valid author',
      url: 'www.valid.com',
      likes: 15
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('A valid blog')
  })

  test('blogs without titles are not added', async () => {
    const loginUser = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)

    const token = await result.body.token

    const newBlog = {
      author: 'OH NO FORGOT TITLE',
      url: 'www.wheresmytitle.com',
      likes: 25
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })


  test('blogs without urls are not added', async () => {
    const loginUser = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)

    const token = await result.body.token

    const newBlog = {
      title: 'OH NO FORGOT URL',
      author: 'Web Site',
      likes: 600
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs without likes are set as 0 likes', async () => {
    const loginUser = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)

    const token = await result.body.token

    const newBlog = {
      title: 'Disliked blog',
      author: 'Sad Author',
      url: 'www.nolikes.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[2].likes).toBe(0)
  })

  test('blogs cant be posted without tokens', async () => {
    const newBlog = {
      title: 'no token',
      author: 'Zero Tokens',
      url: 'www.wheretokens.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      //no token
      //.set('Authorization', ``)
      .send(newBlog)
      .expect(401)
  })
})

describe('Id(entifying) blogs', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('identifying blogs is done with ids', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

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
    //getting a token
    const loginUser = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)

    const token = await result.body.token

    //posting a new blog
    const newBlog = {
      title: 'How to delete a blog',
      author: 'Blog Deleter',
      url: 'www.deletedblog.com',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    //check that posted blog exists
    const blogsAtMid = await helper.blogsInDb()
    const blogToDelete = blogsAtMid[2]

    const titlesMiddle = blogsAtMid.map(r => r.title)

    expect(titlesMiddle).toContain(blogToDelete.title)

    //delete created blog
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const titlesEnd = blogsAtEnd.map(r => r.title)

    expect(titlesEnd).not.toContain(blogToDelete.title)
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