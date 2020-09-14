describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user ={
      name: 'Juan',
      username: 'juan',
      password: 'abretesesamo'
    }
    cy.request('POST', 'http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('juan')
      cy.get('#password').type('abretesesamo')
      cy.get('#login-button').click()

      cy.contains('Juan logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ana')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('juan')
      cy.get('#password').type('abretesesamo')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('A new blog can be created')
      cy.get('input[name="author"]').type('Cypress')
      cy.get('input[name="url"]').type('https://docs.cypress.io/')
      cy.get('button[type="submit"]').click()

      cy.contains('A new blog can be created Cypress')
    })
  })

  describe('A blog exists',function(){
    beforeEach(function() {
      cy.get('#username').type('juan')
      cy.get('#password').type('abretesesamo')
      cy.get('#login-button').click()

      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('A new blog can be created')
      cy.get('input[name="author"]').type('Cypress')
      cy.get('input[name="url"]').type('https://docs.cypress.io/')
      cy.get('button[type="submit"]').click()
    })

    it('User can like a blog',function(){
      cy.contains('view').click()
      cy.get('[data-cy=likes]').should('contain',0)
      cy.get('[data-cy=buttonlike]').click()
      cy.get('[data-cy=likes]').should('contain',1)
    })

    it('User can delete the blog',function(){
      cy.contains('view').click()
      cy.contains('A new blog can be created')
      cy.get('[data-cy=buttonremove]').click()
      cy.wait(6000)
      cy.contains('A new blog can be created').should('not.exist')
    })
  })

  describe('ordered according to likes',function(){
    beforeEach(function() {
      cy.login({ username: 'juan', password: 'abretesesamo' })
      cy.createBlog({
        title: 'Blog one added',
        author: 'Cypress',
        url: 'https://docs.cypress.io/',
        likes: 3
      })
      cy.createBlog({
        title: 'Blog two added',
        author: 'Cypress',
        url: 'https://docs.cypress.io/',
        likes: 15
      })
      cy.createBlog({
        title: 'Blog three added',
        author: 'Cypress',
        url: 'https://docs.cypress.io/',
        likes: 0
      })
      cy.createBlog({
        title: 'Blog four added',
        author: 'Cypress',
        url: 'https://docs.cypress.io/',
        likes: 89
      })
    })

    it('pressing view and like',function(){
      cy.get('[data-cy=viewbutton]').then(buttons => {
        cy.wrap(buttons[0]).click()
        cy.wrap(buttons[1]).click()
        cy.wrap(buttons[2]).click()
        cy.wrap(buttons[3]).click()
      })
      cy.get('[data-cy=likes]').then(likes => {
        cy.wrap(likes[0]).should('contain',89)
        cy.wrap(likes[1]).should('contain',15)
        cy.wrap(likes[2]).should('contain',3)
        cy.wrap(likes[3]).should('contain',0)
      })
    })
  })
})