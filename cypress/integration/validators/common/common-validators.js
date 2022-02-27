export default class CommonValidators {

  validateLink(option, linkText) {
    if (option === 'see') {
      expect(cy.contains(linkText)
        .should('be.visible'));
    } else if (option === 'exist') {
      expect(cy.contains(linkText)
        .should('exist'));
    } else {
      expect(cy.contains(linkText)
        .should('not.exist'));
    }
    return this;
  }

  validateText(pageText) {
    expect(cy.contains(pageText)
      .should('be.visible'));
    return this;
  }
}
