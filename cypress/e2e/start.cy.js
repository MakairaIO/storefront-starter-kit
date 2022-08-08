describe(
  'example spec',
  {
    env: {
      foo: 'bar',
    },
  },
  () => {
    it('passes', () => {
      cy.visit('/')
    })
  }
)
