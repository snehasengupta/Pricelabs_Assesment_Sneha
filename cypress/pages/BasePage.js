class BasePage {
  /**
   * Navigate to a path relative to the baseUrl.
   * @param {string} path — the URL path to visit (e.g., '/multicalendar')
   * @returns {BasePage} this — for method chaining
   */
  visit(path) {
    cy.visit(path);
    return this;
  }

  /**
   * Get the current URL.
   * @returns {Cypress.Chainable} — chainable URL assertion target
   */
  getCurrentUrl() {
    return cy.url();
  }

  /**
   * Get the page title.
   * @returns {Cypress.Chainable} — chainable title assertion target
   */
  getPageTitle() {
    return cy.title();
  }
}

export default BasePage;
