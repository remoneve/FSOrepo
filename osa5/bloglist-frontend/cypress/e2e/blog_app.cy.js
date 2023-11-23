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
      cy.get('#username').type('remoneve')
      cy.get('#password').type('salaisuus')

      cy.get('#login-button').click()
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
      cy.get('#username').type('remoneve')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()

      cy.get('#create-blog-button').click()
      cy.contains('create new')

      cy.get('#title').type('e2e testing')
      cy.get('#author').type('Veeti')
      cy.get('#url').type('legiturl')

      cy.get('#save-button').click()
    })
  
    it('A blog can be liked', function() {
      cy.get('#view-button').click()
      cy.contains('likes 0')
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })
  })
})