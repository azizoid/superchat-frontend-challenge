describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.github.com/users/**', (req) => {
      req.reply({ fixture: 'getUser.json' })
    }).as('getUser')
    cy.intercept('GET', 'https://api.github.com/users/**/repos', (req) => {
      req.reply({ fixture: 'getRepos.json' })
    }).as('getRepos')
    cy.intercept('GET', 'https://api.github.com/repos/**', (req) => {
      req.reply({ fixture: 'getRepoDetails.json' })
    }).as('getRepoDetails')
    cy.intercept('GET', 'https://api.github.com/repos/**/contributors?per_page=10&anon=true', (req) => {
      req.reply({ fixture: 'getContributors.json' })
    }).as('getContributors')

    cy.intercept('POST', 'https://api.github.com/api/githublink/*', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'savePreviewData.json'
      })
    }).as('savePreviewData')

    cy.visit('http://localhost:3000')
  })

  it('should find main elements of the app', () => {
    cy.contains('Creative GitHub Link Generator')
    cy.get('input[type=text]')
    cy.get('button[type=submit]')
    cy.get('button[data-cy=saveBtn]').should('be.disabled')
    cy.get('button[data-cy=darkModeBtn]')

    cy.get('[data-cy=progress-bar]').should('exist')

    cy.get('[data-cy=preview]').should('not.exist')
  })

  it('gets repository list by username', () => {
    cy.get('#repositoryList').should("not.exist")

    cy.get('input[type=text]').type('azizoid')
    cy.get('button[type=submit]')
      .click()
      .get('#repositoryList')
  })

  it('changes theme on theme button click', () => {
    cy.get('button[data-cy=darkModeBtn]').click().get('button[data-cy=lightModeBtn')
  })

  it('tests the whole cycle', () => {
    cy.get('[data-cy=noRepositoryPanel]')
    cy.get('input[type=text]').type('azizoid')

    cy.get('button[type=submit]')
      .click()

    cy.get('#repositoryList')
      .get('a[data-cy=repository-item]')
      .first()
      .click()

    cy.get('button[data-cy=saveBtn]').should('be.enabled').click()

    cy.get('[data-cy=preview]').get('[data-cy=social-links]').should('be.visible')
  })
})
