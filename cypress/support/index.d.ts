/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in via the LoginPage POM.
     * 
     * **Implemented in:** `cypress/support/commands/auth.commands.js`
     * 
     * @example cy.login()
     */
    login(): Chainable<void>;

    /**
     * Custom command to tear down the session by clearing cookies, localStorage, and sessionStorage.
     * 
     * **Implemented in:** `cypress/support/commands/auth.commands.js`
     * 
     * @example cy.logout()
     */
    logout(): Chainable<void>;

    /**
     * Custom command to dismiss onboarding/recommendations popup by typing ESC on body.
     * 
     * **Implemented in:** `cypress/support/commands/auth.commands.js`
     * 
     * @example cy.dismissRecommendationsPopup()
     */
    dismissRecommendationsPopup(): Chainable<void>;

    /**
     * Custom command to wait for the DSO save/update network request.
     * 
     * **Implemented in:** `cypress/support/commands/network.commands.js`
     * 
     * @example cy.waitForDSOSave()
     */
    waitForDSOSave(): Chainable<void>;

    /**
     * Custom command to wait for the calendar load network request and assert DOM visibility.
     * 
     * **Implemented in:** `cypress/support/commands/network.commands.js`
     * 
     * @example cy.waitForCalendarLoad()
     */
    waitForCalendarLoad(): Chainable<void>;

    /**
     * Custom command to wait for the search results network request.
     * 
     * **Implemented in:** `cypress/support/commands/network.commands.js`
     * 
     * @example cy.waitForSearchResults()
     */
    waitForSearchResults(): Chainable<void>;

    /**
     * Custom command to programmatically perform a GET request to listings API,
     * save response to fixture, and extract listing_id.
     * 
     * **Implemented in:** `cypress/support/commands/network.commands.js`
     * 
     * @example cy.requestListingsAndExtractId().then((id) => { ... })
     */
    requestListingsAndExtractId(): Chainable<string | undefined>;

    /**
     * Reusable Custom Cypress command to select a date range via typing in the inputs.
     * 
     * **Implemented in:** `cypress/support/commands/network.commands.js`
     * 
     * @param startSelector - CSS selector for the start date field
     * @param endSelector - CSS selector for the end date field
     * @param startDate - the start date to enter (YYYY-MM-DD)
     * @param endDate - the end date to enter (YYYY-MM-DD)
     * 
     * @example cy.selectDateRangeViaInput('.start-input', '.end-input', '2026-06-01', '2026-06-01')
     */
    selectDateRangeViaInput(startSelector: string, endSelector: string, startDate: string, endDate: string): Chainable<void>;
  }
}
