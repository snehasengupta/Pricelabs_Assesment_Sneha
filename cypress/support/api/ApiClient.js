// ApiClient — wraps cy.request() for all DSO API interactions (organised by REST resource)
//
// All API test files use this class instead of raw cy.request() calls.
// Auth header is injected from Cypress.env('authToken').
// failOnStatusCode is set to false so negative tests can explicitly assert status codes.

class ApiClient {
  /**
   * Create an ApiClient instance.
   * Auth token is read from Cypress.env() — never hardcoded.
   */
  constructor() {
    this.baseUrl = Cypress.env('apiBaseUrl');
    this.authToken = Cypress.env('authToken');
  }

  /**
   * Build the standard authorization headers.
   * @param {string} [tokenOverride] — optional token to override the default (for expired token tests)
   * @returns {object} — headers object with Authorization
   */
  _getHeaders(tokenOverride) {
    return {
      Authorization: `Bearer ${tokenOverride || this.authToken}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * GET DSO value(s) for a property/date.
   * @param {object} params — query parameters (propertyId, date, etc.)
   * @param {object} [options] — optional overrides (e.g., custom token)
   * @returns {Cypress.Chainable} — the response object for assertion
   */
  getDSO(params = {}, options = {}) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/v1/dso`, // TODO: update with real endpoint
      headers: this._getHeaders(options.tokenOverride),
      qs: params,
      failOnStatusCode: false,
    });
  }

  /**
   * POST/PUT to update a DSO value.
   * @param {object} payload — the DSO update payload (propertyId, date, dsoValue, etc.)
   * @param {object} [options] — optional overrides (e.g., custom token)
   * @returns {Cypress.Chainable} — the response object for assertion
   */
  updateDSO(payload = {}, options = {}) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/v1/dso`, // TODO: update with real endpoint
      headers: this._getHeaders(options.tokenOverride),
      body: payload,
      failOnStatusCode: false,
    });
  }

  /**
   * DELETE a DSO override.
   * @param {object} params — identifying parameters (propertyId, date, etc.)
   * @param {object} [options] — optional overrides (e.g., custom token)
   * @returns {Cypress.Chainable} — the response object for assertion
   */
  deleteDSO(params = {}, options = {}) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}/v1/dso`, // TODO: update with real endpoint
      headers: this._getHeaders(options.tokenOverride),
      body: params,
      failOnStatusCode: false,
    });
  }
}

export default ApiClient;
