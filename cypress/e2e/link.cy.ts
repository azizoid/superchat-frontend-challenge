describe('Home Page', () => {
  const id = '472c0af8'
  const username = 'azizoid'
  const repo = 'nam.az'

  beforeEach(() => {
    cy.intercept('GET', `/api/githublink/${id}`, req => {
      req.reply({ fixture: 'getLinkData.json' })
    }).as('getLinkData')
    cy.intercept('GET', `https://api.github.com/users/${username}`, req => {
      req.reply({ fixture: 'getUser.json' })
    }).as('getUser')
    cy.intercept(
      'GET',
      `https://api.github.com/repos/${username}/${repo}`,
      req => {
        req.reply({ fixture: 'getRepoDetails.json' })
      },
    ).as('getRepoDetails')
    cy.intercept(
      'GET',
      `https://api.github.com/repos/${username}/${repo}/contributors?per_page=10&anon=true`,
      req => {
        req.reply({ fixture: 'getContributors.json' })
      },
    ).as('getContributors')
  })

  it('should find main elements of sharable page', () => {
    cy.visit(`http://localhost:3000/r/${id}`)

    cy.get('[data-cy=basic-info]').contains('Basic Info')
    cy.get('[data-cy=preview-username]').should('contain', username)
    cy.get('[data-cy=preview-repo]').should('contain', repo)
    cy.get('button[data-cy=preview-theme]')
      .should('have.class', 'btn-dark')
      .get('[data-cy=preview-stars]')
      .contains('43')
    cy.get('[data-cy=preview-contributors')
      .get('[data-cy=contributor-item]')
      .should('have.length', 2)
  })

  it('shows Not found if user not in our db', () => {
    cy.visit('http://localhost:3000/r/someFakeId')

    cy.get('[data-cy=basic-info]').should('not.exist')
  })
})
