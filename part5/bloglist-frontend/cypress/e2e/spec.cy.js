describe('blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', {
      name: 'Andrew',
      username: 'andyyyyy',
      password: '123456',
    })
    cy.request('POST', 'http://localhost:3001/api/users/', {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    })
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Bloglist')
    cy.contains('Please log in')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      it('login succeeds with correct credentials', function () {
        cy.get('.username').type('andyyyyy')
        cy.get('.password').type('123456')
        cy.get('.loginButton').click()
      })

      cy.contains('Andrew logged in')
    })

    it('a new blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('.title').type('a blog created')
      cy.get('.author').type('cypress')
      cy.get('.urlAddress').type('cypress.com')
      cy.get('.createButton').click()
      cy.contains('a blog created by cypress')
    })

    it('a blog can be liked', function () {
      cy.contains('a blog created by cypress')
      cy.contains('View').click()
      cy.contains('+').click()
      cy.contains('1')
    })

    it('a blog can be deleted', function () {
      cy.contains('a blog created by cypress')
      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.get('html').should('not.contain', 'a blog created by cypress')
    })

    it('only the creator can delete a blog', function () {
      cy.get('.username').type('mluukkai')
      cy.get('.password').type('salainen')
      cy.get('.loginButton').click()
      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.contains('a blog created by cypress')
    })

    it('blogs are ordered according to likes', function () {
      cy.contains('New blog').click()
      cy.get('.title').type('another blog created')
      cy.get('.author').type('cypress')
      cy.get('.urlAddress').type('cypress.com')
      cy.get('.createButton').click()
      cy.contains('another blog created by cypress')
      cy.contains('View').click()
      cy.contains('+').click()
      cy.wait(1000)
      cy.contains('+').click()
      cy.wait(1000)
      cy.visit('http://localhost:3000')
      cy.get('.blog').eq(0).should('contain', 'another blog created by cypress')
      cy.get('.blog').eq(1).should('contain', 'a blog created by cypress')
    })
  })
})
