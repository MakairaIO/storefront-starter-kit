describe('Discovery Image Component', () => {
  it('have a correct style', () => {
    cy.intercept('GET', '**/images/discoveryImage/**').as('loadImage')
    cy.visit(Cypress.env('PALI_PATH') + 'Discovery%20Image_Discovery%20Image')
    cy.wait('@loadImage')
    cy.compareSnapshot('discovery-image')
  })

  it('have a correct style on mobile', () => {
    cy.viewport(390, 840)
    cy.intercept('GET', '**/images/discoveryImage/**').as('loadImage')
    cy.visit(Cypress.env('PALI_PATH') + 'Discovery%20Image_Discovery%20Image')
    cy.wait('@loadImage')
    cy.compareSnapshot('discovery-image-mobile')
  })

  it('have a correct style on tablet', () => {
    cy.viewport(1080, 810)
    cy.intercept('GET', '**/images/discoveryImage/**').as('loadImage')
    cy.visit(Cypress.env('PALI_PATH') + 'Discovery%20Image_Discovery%20Image')
    cy.wait('@loadImage')
    cy.compareSnapshot('discovery-image-tablet')
  })
})
