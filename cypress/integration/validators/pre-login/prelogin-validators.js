export default class preLoginValidators {
  validatePreLoginHeroSection() {
    expect(cy.get('div[class="prelogin-hero section"]').should('exist'));
    return this;
  }

  validatePreLoginSolutionsSection() {
    expect(cy.get('div[class="prelogin-solutions section"]').should('exist'));
    return this;
  }

  validatePreLoginMarketingSection() {
    expect(cy.get('div[class="marketing-module-r section"]').should('exist'));
    return this;
  }

  validatePreLoginJustSoldSection() {
    expect(cy.get('div[class="prelogin-just-sold section"]').should('exist'));
    return this;
  }

  validatePreLoginSimpleHeadlineSection() {
    expect(cy.get('div[class="prelogin-simple-headline section"]').should('exist'));
    return this;
  }

  validatePreLoginWaterfallSection() {
    expect(cy.get('div[class="prelogin-solution-waterfall section"]').should('exist'));
    return this;
  }

  validatePreLoginNewsSection() {
    expect(cy.get('div[class="news-container section"]').should('exist'));
    return this;
  }
}
