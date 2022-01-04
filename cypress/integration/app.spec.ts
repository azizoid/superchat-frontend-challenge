describe('Home Page', () => {
  beforeEach(() => {
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
})
