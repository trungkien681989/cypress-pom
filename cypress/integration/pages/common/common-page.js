/* eslint-disable no-unused-vars */
export default class CommonPage {
  performExtraSmallWait() {
    cy.wait(Cypress.env('extraSmallWait'));
    return this;
  }

  performSmallWait() {
    cy.wait(Cypress.env('smallWait'));
    return this;
  }

  performLongWait() {
    cy.wait(Cypress.env('longWait'));
    return this;
  }

  setDefaultViewport(option) {
    const views = {
      xs: 'iphone-6',
      small: 'iphone-5',
      medium: 'ipad-2',
      large: 'macbook-16',
      xl: 'macbook-13',
      xxl: 'macbook-11',
      default: 'macbook-15',
    };
    if (option === 'small' || option === 'large') {
      cy.viewport(views[option], 'landscape');
    } else {
      cy.viewport(views[option]);
    }
    return this;
  }

  clickButton(btnText) {
    cy.clickButton(btnText);
    return this;
  }

  clickUserIqButton() {
    cy.get('input[name="4683"]')
      .eq(2)
      .should('be.visible')
      .click();
    cy.get('textarea[id="_uiq_ft_comment_4684"]')
      .should('be.visible')
      .click()
      .type('TEST');
    cy.get('button[id="_uiq_ft_bt1"]')
      .should('be.visible')
      .click();
    return this;
  }

  clickBackButton() {
    cy.go('back', { waitForAnimations: true, timeout: 60000 });
    return this;
  }

  clickLink(linkText) {
    cy.clickLink(linkText);
    return this;
  }

  clickLinkSameWindow(linkText) {
    cy.clickLinkSameWindow(linkText);
    return this;
  }

  clickLinkByHref(hrefText) {
    cy.task('setValue', { key: 'auctionId', value: hrefText });
    cy.get(`a[href*=${hrefText}]`)
      .eq(0)
      .should('exist')
      .click({ force: true });
    return this;
  }

  clickSocialMediaLinkByHref(linkText) {
    cy.get(`a[href*=${linkText}]`)
      .eq(0)
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .invoke('removeAttr', 'onclick')
      .click({ force: true });
    return this;
  }

  clickBackToTop() {
    cy.get('div[id="uhf-back-to-top"]')
      .should('be.visible')
      .click();
    return this;
  }

  ignoreUncaughtException() {
    Cypress.on('uncaught:exception', (err, runnable) => false);
    return this;
  }

  handleAlert() {
    Cypress.on('window:confirm', (txt) => false);
    return this;
  }
}
