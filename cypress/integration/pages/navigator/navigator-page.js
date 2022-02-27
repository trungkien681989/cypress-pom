import CommonPage from '../common/common-page';

const commonPage = new CommonPage();

export default class NavigatorPage {
  navigateToSite() {
    cy.log(`env:: ${Cypress.env('ENV')}`);
    this.setBaseUrl();
    cy.task('getValue', { key: 'baseUrl' })
      .then((baseUrl) => {
        cy.visit(`${baseUrl}`, {
          onBeforeLoad(win) {
            const latitude = 33.7490;
            const longitude = 84.3880;
            cy.stub(win.navigator.geolocation, 'getCurrentPosition')
              .callsFake((cb) => cb({
                coords: {
                  latitude,
                  longitude,
                },
              }));
          },
        });
      });
    commonPage.ignoreUncaughtException();
    return this;
  }

  navigateMenu(mainTab, subLink) {
    this.clickNavigationTab(mainTab);
    this.clickSubLinkSameWindow(mainTab, subLink);
    return this;
  }

  clickNavigationTab(mainTab) {
    cy.get(`div[class*="uhf-panel--${mainTab.toLowerCase()}"]`)
      .within(($tab) => {
        cy.get($tab)
          .get(`label[id*="uhf---panelbutton--${mainTab}"]`)
          .should('exist')
          .click({ force: true });
      });
    return this;
  }

  clickSubLinkSameWindow(mainTab, subLink) {
    commonPage.performSmallWait();
    cy.task('setValue',
      {
        key: 'selectedSubLink',
        value: subLink,
      }).then(() => {
      cy.task('getValue', { key: 'selectedSubLink' })
        .then(($subLink) => {
          cy.get(`div[class*="uhf-panel--${mainTab.toLowerCase()}"]`)
            .within(($tab) => {
              cy.get($tab)
                .get('a')
                .contains($subLink)
                .invoke('removeAttr', 'target')
                .invoke('removeAttr', 'onclick')
                .click({ waitForAnimations: true, force: true });
            });
        });
    });
    return this;
  }

  setBaseUrl() {
    switch (Cypress.env('ENV')) {
      case 'qa':
        cy.task('setValue', {
          key: 'auctionId',
          value: 'QLM1',
        });
        cy.task('setValue', {
          key: 'baseUrl',
          value: 'https://www.manheim.man-qa1.com/',
        });
        break;
      case 'silo5':
        cy.task('setValue', {
          key: 'auctionId',
          value: 'QLM1',
        });
        cy.task('setValue', {
          key: 'baseUrl',
          value: 'https://www.manheim.man-silo5.com',
        });
        break;
      case 'uat':
        cy.task('setValue', {
          key: 'auctionId',
          value: 'PLM1',
        });
        cy.task('setValue', {
          key: 'baseUrl',
          value: 'https://www.manheim.man-uat.com',
        });
        break;
      default:
        cy.task('setValue', {
          key: 'auctionId',
          value: 'CINA',
        });
        cy.task('setValue', {
          key: 'baseUrl',
          value: 'https://www.manheim.com/',
        });
        break;
    }
    return this;
  }
}
