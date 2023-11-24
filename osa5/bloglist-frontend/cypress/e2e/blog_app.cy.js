/* eslint-disable */

describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Veeti Remonen',
      username: 'remoneve',
      password: 'salaisuus'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    
    const secondUser = {
      name: 'Reeti Vemonen',
      username: 'another',
      password: 'user'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', secondUser) 

    cy.visit('http://localhost:5173')
  })
  
  it('Login form is shown', function() {
    cy.visit('http://localhost:5173')
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('remoneve')
      cy.get('#password').type('salaisuus')

      cy.get('#login-button').click()
      cy.contains('Veeti Remonen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('remoneve')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
  
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'remoneve', password: 'salaisuus'})
    })

    it('A blog can be created', function() {
      cy.get('#create-blog-button').click()

      cy.contains('create new')

      cy.get('#title').type('e2e testing')
      cy.get('#author').type('Veeti')
      cy.get('#url').type('legiturl')

      cy.get('#save-button').click()

      cy.contains('e2e testing, Veeti')
    })
  })

  describe('Editing a blog', function() {
    beforeEach(function() {
      cy.login({username: 'remoneve', password: 'salaisuus'})

      cy.createBlog({
        title: 'e2e testing',
        author: 'Veeti',
        url: 'legiturl'
      })
    })
  
    it('A blog can be liked', function() {
      cy.get('.view-button').click()
      cy.contains('likes 0')
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function() {
      cy.get('.view-button').click()
      cy.get('#remove-button').click()
      cy.contains('Removed blog "e2e testing" by Veeti')
    })

    it ('Only the creator can see the "remove"-button', function() {
      cy.get('#remove-button')
      
      cy.get('#logout-button').click()
      cy.reload()

      cy.get('#username').type('another')
      cy.get('#password').type('user')
      cy.get('#login-button').click()

      cy.get('.view-button').click()

      cy.get('#remove-button').should('not.visible');
    })

    it('Blogs are listed in the correct order', function() {
      cy.createBlog({
        title: 'Wowblog',
        author: 'Doge',
        url: 'muchurl',
        likes: "4"
      })

      cy.createBlog({
        title: 'the best',
        author: 'Bloge',
        url: 'wowurl',
        likes: "69"
      })
      
      cy.get('.view-button').click({ multiple: true })

      cy.get('.blog').eq(0).should('contain', 'the best')
      cy.get('.blog').eq(1).should('contain', 'Wowblog')
      cy.get('.blog').eq(2).should('contain', 'e2e testing')
    })
  })

})