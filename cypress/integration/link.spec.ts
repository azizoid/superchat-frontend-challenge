describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/githublink/**', (req) => {
      req.reply({ fixture: 'getLinkData.json' })
    }).as('getLinkData')
    cy.intercept('GET', 'https://api.github.com/users/**', (req) => {
      req.reply({ fixture: 'getUser.json' })
    }).as('getUser')
    cy.intercept('GET', 'https://api.github.com/repos/**', (req) => {
      req.reply({ fixture: 'getRepoDetails.json' })
    }).as('getRepoDetails')
    cy.intercept('GET', 'https://api.github.com/repos/**/contributors?per_page=10&anon=true', (req) => {
      req.reply({ fixture: 'getContributors.json' })
    }).as('getContributors')
  })

  it('should find main elements of sharable page', () => {
    cy.visit('http://localhost:3000/r/472c0af8-d1de-4de2-a8c4')

    cy.get('[data-cy=basic-info]').contains('Basic Info')
    cy.get('[data-cy=preview-username]').should('contain', 'azizoid')
    cy.get('[data-cy=preview-repo]').should('contain', 'nam.az')
    cy.get('button[data-cy=preview-theme]').should('have.class', 'btn-dark').get('[data-cy=preview-stars]').contains('43')
    cy.get('[data-cy=preview-contributors').get('ul > li').should('have.length', 2)
  })
})
