// npm install --save-dev cypress
// Cypress tests are run completely within the browser and can only run when both the backend and frontend are
// Cypress tests do not start the system when they are run
// We explicitly do not use arrow functions because, Cypress being built on Mocha, arrow functions might cause problems

// When Cypress runs a test, it adds each cy command to execution queue
// When code of test method has run, Cypress will execute each command one by one and always return undefined
// Debugger starts only if Cypress test runner's console is open
// Possible to run Cypress tests from command line using "cypress run"
describe('Note app', function () {
  beforeEach(function () {
    // We add a new user to the backend
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Joshua Ong',
      username: 'ArKane6418',
      password: "Demonslayer299"
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)

    // Cypress recommends that we "fully test login flow, but only once" so we should "Bypass teh UI"
    // This means we handle login by doing an HTTP request to backend, since it's much faster than using a form
    // All Cypress commands are promises

    /* cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'ArKane6418', password: 'Demonslayer299'
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
    })
    */
    // cy.visit visits the specified url
    cy.visit('http://localhost:3000')
    // When we write new tests, we have to use the login code in multiple places
    // Much easier to create a custom command, which are defined in cypress/support/commands.js

  })


  it('front page can be opened', function () {

    // cy.contains searches for the specified string in the page
    cy.contains('Notes')
    cy.contains('Note app, Joshua Ong, Full Stack Open 2021')
  })

  it('login form can be opened', function () {
    // Search for login button then click
    cy.contains('Log In').click()
  })

  // When developing a new test/debugging broken test, we use it.only to tell Cypress to only run that test
  it('login fails with wrong password', function () {
    cy.contains('Log In').click()
    cy.get('#username').type('ArKane6418')
    cy.get('#password').type('wrong')
    cy.get('#login-btn').click()

    // Ensure that the correct component contains what we want
    // contains only works on text content so we can use should for more diversity
    cy.get('.error')
      .should('contain','Wrong credentials')

      // We can chain these checks with .and because we're looking at the same component for all three
      // Ensure we have the right CSS for the .error div
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Joshua Ong logged in')
  })

  // Both the visible login button and submit button have the same name so that could cause conflict
  // Run npm install eslint-plugin-cypress --save-dev and update .eslintrc.json

  it('user can log in', function () {
    cy.contains('Log In').click()
    // cy.get allows you to get elements by CSS selectors
    // cy.type lets you automate typing
    cy.get('#username').type('ArKane6418')
    cy.get('#password').type('Demonslayer299')
    cy.get('#login-btn').click()

    cy.contains('Joshua Ong logged in')
  })

  // Why log in a second time when the tests are run in order?
  // Each test starts from zero as far as the browser is concerned, so all changes to the state are reversed

  describe('when user logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ArKane6418', password: 'Demonslayer299' })
    })

    // We should also create a custom command for note creation
    it('a new note can be created', function () {
      cy.contains('New Note').click()
      cy.get('input').type('A new note created by cypress')
      cy.contains('save').click()
      cy.contains('A new note created by cypress')
    })

    describe('and a note exists', function () {
      // Create a new note before anything else
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('the note can be made important', function () {
        // Look for new note content and Make Important button
        // Remember in NoteForm, important is false by default
        cy.contains('another note cypress').parent().find('button').as('ImportantButton')
        cy.get('@ImportantButton').click()

        // After clicking Make Important, check for Make Unimportant
        cy.contains('another note cypress').parent().contains('Make Unimportant')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        // Recall that contains looks for the first instance of the text content on the page
        // If we didn't chain them together, we would have gotten the button for 'first note'
        // Use .parent() to get parent element of span (the div containing button) and use .find()
        // Cannot use .get() because it searches entire page and returns all buttons from page

        // Let's simplify this and get rid of some copy-paste using.as
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'Make Unimportant')
      })
    })
  })
})