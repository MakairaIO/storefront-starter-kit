describe('Discovery Image Component', () => {
  it('have a correct style', () => {
    cy.intercept('GET', '**/images/discoveryImage/**').as('loadImage')
    cy.visit(Cypress.env('PALI_PATH') + 'Discovery%20Image_Discovery%20Image')
    cy.wait('@loadImage')
    cy.compareSnapshot('discovery-image')
  })
})
