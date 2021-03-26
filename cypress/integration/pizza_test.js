describe('Pizza app', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/pizza')
  })

  it('sanity check', () => {
    expect(1+2).to.equal(3)
  })

  it('check if inputs are working', () => {
    cy.get('input[name="name"]')
      .should("have.value", "")
      .type("adam")
      .should("have.value", "adam")
  })

  it('check if checkboxes are working', () => {
    cy.get('input[name="pepperoni"]')
      .should("not.be.checked")
      .click()
      .should("be.checked")

    cy.get('input[name="mushrooms"]')
      .should("not.be.checked")
      .click()
      .should("be.checked")
  })

  it('can submit form button', () => {
    cy.get('input[name="name"]')
      .should("have.value", "")
      .type("adam")
      .should("have.value", "adam")

    cy.get("#submitBtn")
      .click()
  })

})