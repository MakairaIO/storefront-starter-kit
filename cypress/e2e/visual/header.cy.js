describe('Header Component', () => {
  it('have a correct style', () => {
    cy.visit(Cypress.env('PALI_PATH') + 'Header_Default')
    cy.compareSnapshot('header')
  })

  it('have a correct style on mobile', () => {
    cy.viewport(390, 840)
    cy.visit(Cypress.env('PALI_PATH') + 'Header_Default')
    cy.compareSnapshot('header-mobile')
  })

  it('have a correct style on tablet', () => {
    cy.viewport(1080, 810)
    cy.visit(Cypress.env('PALI_PATH') + 'Header_Default')
    cy.compareSnapshot('headere-tablet')
  })
})
