/* eslint-disable no-param-reassign */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false;
    // create own log w/ masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }
  return originalFn(element, text, options);
});

/**
 * @memberOf cy
 * @method login
 * @param {string} dealerName
 * @returns Chainable
 */
Cypress.Commands.add('login', (dealerName) => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.fixture('user').then((userName) => {
    cy.get('input[id="user_username"]')
      .clear()
      .type(userName[dealerName], { log: true });
    cy.task('setValue', { key: 'dealer', value: userName[dealerName] });
    cy.fixture('prod').then((pw) => {
      cy.task('getValue', { key: 'dealer' })
        .then((dealer) => {
          switch (Cypress.env('ENV')) {
            case 'qa':
              cy.task('setValue', {
                key: 'pswd',
                value: 'password',
              }, { log: false });
              break;
            case 'silo5':
              cy.task('setValue', {
                key: 'pswd',
                value: 'password',
              }, { log: false });
              break;
            case 'uat':
              cy.task('setValue', {
                key: 'pswd',
                value: 'demo',
              }, { log: false });
              break;
            default:
              cy.task('setValue', {
                key: 'pswd',
                value: pw[dealer],
              }, { log: false });
              break;
          }
          cy.task('getValue', { key: 'pswd' })
            .then((pswd) => {
              cy.get('input[id="user_password"]')
                .clear()
                .type(pswd, { sensitive: true });
            });
        });
    });
  });
});

/**
 * @memberOf cy
 * @method clickButton
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickButton',
  (label) => {
    cy.contains(label)
      .should('exist');
    cy.get('button')
      .contains(label)
      .should('be.visible')
      .scrollIntoView()
      .click({ waitForAnimations: true, force: true });
  });

/**
 * @memberOf cy
 * @method clickLinkSameWindow
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickLinkSameWindow',
  (label) => {
    cy.contains(label)
      .should('exist');
    cy.get('a')
      .contains(label)
      .should('be.visible')
      .scrollIntoView()
      .invoke('removeAttr', 'target')
      .invoke('removeAttr', 'onclick')
      .click({ waitForAnimations: true, force: true });
  });

/**
 * @memberOf cy
 * @method clickLink
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickLink',
  (label) => {
    cy.contains(label)
      .should('exist');
    cy.get('a')
      .contains(label)
      .should('exist')
      .scrollIntoView()
      .click({ waitForAnimations: true, force: true });
  });

/**
 * @memberOf cy
 * @method clickLinkButton
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickLinkButton',
  (label) => {
    cy.get(`button[aria-label="${label}"]`)
      .should('exist')
      .scrollIntoView()
      .click({ waitForAnimations: true, force: true });
  });

/**
 * @memberOf cy
 * @method clickSpan
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickSpan',
  (label) => {
    cy.contains(label)
      .should('exist');
    cy.get('span')
      .contains(label)
      .should('exist')
      .scrollIntoView()
      .click({ waitForAnimations: true, force: true });
  });

/**
 * @memberOf cy
 * @method signOut
 * @returns Chainable
 */
Cypress.Commands.add('signOut', () => {
  cy.get('div[class="uhf-account"]')
    .within(($account) => {
      cy.get($account)
        .get('span[class="uhf-account__user__sign-out"]')
        .get('a')
        .contains('Sign Out')
        .should('exist')
        .scrollIntoView()
        .click({ waitForAnimations: true, force: true });
    });
});

/**
 * @memberOf cy
 * @method validateLink
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('validateLink',
  (linkText) => {
    cy.get('a')
      .contains(linkText)
      .should('exist');
  });

/**
 * @memberOf cy
 * @method clickSignIn
 * @returns Chainable
 */
Cypress.Commands.add('clickSignIn',
  () => {
    cy.get('span[class="uhf-user__sign-in"]')
      .within((span) => {
        cy.get(span)
          .get('a')
          .invoke('attr', 'class', 'uhf-user__link')
          .click({ waitForAnimations: true, force: true });
      });
  });
