describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Joshua Ong',
      username: 'ArKane-6418',
      password: 'HopeThisWorks'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log In')
  })

  it('login form can be opened', function () {
    // Search for login button then click
    cy.contains('Log In').click()
  })

  describe('Login',function () {
    it('succeeds with correct credentials', function() {
      cy.contains('Log In').click()
      cy.get('#username').type('ArKane-6418')
      cy.get('#password').type('HopeThisWorks')
      cy.get('#login-btn').click()

      cy.contains('Joshua Ong logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Log In').click()
      cy.get('#username').type('ArKane-6418')
      cy.get('#password').type('HopeThisDoens\'tWork')
      cy.get('#login-btn').click()

      cy.get('.error').should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Joshua Ong logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // cy.contains('Log In').click()
      // cy.get('#username').type('ArKane-6418')
      // cy.get('#password').type('HopeThisWorks')
      // cy.get('#login-btn').click()
      cy.login({ username: 'ArKane-6418', password: 'HopeThisWorks' })
    })

    it('A blog can be created', function () {
      cy.contains('Create New Blog').click()
      cy.get('#title-input').type('Blog created by Cypress')
      cy.get('#author-input').type('Author created by Cypress')
      cy.get('#url-input').type('URL created by Cypress')
      cy.get('#create-blog').click()
      cy.contains('Title: Blog created by Cypress')
    })

    describe('A blog exists', function () {
      beforeEach(function () {
        cy.createBlog(
          { title: 'Blog created by Cypress', author: 'Author created by Cypress', url: 'URL created by Cypress', likes: 0}
        )
      })
      it('User can like a blog', function () {
        cy.contains('Title: Blog created by Cypress').get('.view-btn').click().get('.like-btn').click()
        cy.contains('Likes: 1')
      })

      it('User can delete their blog', function () {
        cy.contains('Title: Blog created by Cypress').get('.view-btn').as('clickedView')
        cy.get('@clickedView').click().get('.remove-btn').click()
        cy.on('window:confirm', () => true)
        cy.get('html').should('not.contain', 'Title: Blog created by Cypress')
      })
    })

    describe('several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Blog 1 created by Cypress', author: 'ArKane 1', url: 'google', likes: 10 })
        cy.createBlog({ title: 'Blog 2 created by Cypress', author: 'ArKane 2', url: 'firefox', likes: 12 })
        cy.createBlog({ title: 'Blog 3 created by Cypress', author: 'ArKane 3', url: 'brave', likes: 12 })
      })

      it('the blog with the most likes is at the top', function () {

        // Name each view button to avoid redundancy
        cy.contains('Title: Blog 1 created by Cypress')
          .parent()
          .find('.view-btn')
          .as('Blog1-View')

        cy.contains('Title: Blog 2 created by Cypress')
          .parent()
          .find('.view-btn')
          .as('Blog2-View')

        cy.contains('Title: Blog 3 created by Cypress')
          .parent()
          .find('.view-btn')
          .as('Blog3-View')

        // Expect the blog with the most likes to be Blog 2 initially (2nd was added before 3rd)
        cy.get('.blog:first').contains('Title: Blog 2 created by Cypress')

        // Name the Blog 1 and Blog 3 like buttons
        cy.get('@Blog1-View')
          .click()
          .parent()
          .find('.like-btn')
          .as('Blog1-Like')

        cy.get('@Blog3-View')
          .click()
          .parent()
          .find('.like-btn')
          .as('Blog3-Like')

        // Click Blog 1 like button once (likes = 11)
        cy.get('@Blog1-Like')
          .click()
          .parent()
          .parent()
          .parent()
          .contains('Likes: 11')

        cy.get('@Blog2-View')
          .click()
          .parent()
          .contains('Likes: 12')

        // Click Blog 3 like button once (likes = 13, new highest)
        cy.get('@Blog3-Like')
          .click()
          .parent()
          .parent()
          .parent()
          .contains('Likes: 13')

        cy.get('.blog:first').contains('Title: Blog 3 created by Cypress')
      })
    })
  })
})