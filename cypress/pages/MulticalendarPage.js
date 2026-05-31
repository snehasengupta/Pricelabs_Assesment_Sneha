import BasePage from './BasePage';
import MulticalendarLocators from '../locators/MulticalendarLocators';

class MulticalendarPage extends BasePage {
  /**
   * Navigate to the Multicalendar page.
   * @returns {MulticalendarPage} this
   */
  visit() {
    super.visit('/multicalendar');
    return this;
  }

  /**
   * Click the filter listing icon to open the listings dropdown/list.
   * @returns {MulticalendarPage} this
   */
  clickFilterListings() {
    cy.get(MulticalendarLocators.filterListingsButton).should('be.visible').click();
    cy.get(MulticalendarLocators.listingOption).click();
    cy.contains('div', 'Include').should('be.visible').click();
    cy.contains('Exclude').should('be.visible').click();
    cy.contains('div', 'Exclude').should('be.visible');
    cy.get(MulticalendarLocators.pushPriceStatusPlaceholder).click();
    cy.contains('Error').click();
    cy.contains('Failed').click();
    cy.get(MulticalendarLocators.showListingsButton).click();
    return this;
  }
  selectfromlist() {
    cy.get(MulticalendarLocators.filterListingsButton).should('be.visible').click();
    cy.get(MulticalendarLocators.newfilter).click();
    cy.get(MulticalendarLocators.selectlis).first().click();
    cy.fixture('listings').then((listings) => {
      const firstListing = listings.response.data[0];
      const listingId = firstListing.parent_child_listings?.[0]?.listing_id || firstListing.listing_id;
      const listingName = firstListing.listing_name;

      cy.log(`PASSING LISTING ID TO SEARCH: ${listingId}`);
      cy.log(`PASSING LISTING NAME TO SEARCH: ${listingName}`);

      cy.get(MulticalendarLocators.searchlist).type(listingId);
      cy.get('#react-select-filter-dropdown-listings-listbox').find('div[role="option"]').contains(listingName).should('be.visible').click()
      cy.get(MulticalendarLocators.showListingsButton).click();
    });
    return this;
  }
  hovertooltip() {
    cy.get(MulticalendarLocators.tooltiphover).trigger('mouseover');
    return this;
  }
  getTooltip() {
    return cy.get(MulticalendarLocators.tooltip);
  }

  /**
   * Select a property option from the listings dropdown.
   * Sets up intercept BEFORE clicking to capture the calendar data fetch.
   * @param {string} propertyName — the property name to select
   * @returns {MulticalendarPage} this
   */
  selectProperty(propertyName) {
    cy.intercept('GET', '**/multicalendar**').as('calendarLoad');
    cy.get(MulticalendarLocators.listingOption).contains(propertyName).click();
    cy.waitForCalendarLoad();
    return this;
  }

  /**
   * Click a specific date cell on the calendar grid.
   * @param {number} dateOffset — days from today to target
   * @returns {MulticalendarPage} this
   */
  clickDateCell() {
    cy.get(MulticalendarLocators.calendarDateCell).click({ force: true });
    return this;
  }
  Clicknextdatecell() {
    cy.get(MulticalendarLocators.calendarRow).click({ force: true });
    return this;
  }
  saverow() {
    cy.get(MulticalendarLocators.saveandrefreshbutton).click();
    return this;
  }
  getFinalPriceCell(dateOffset) {
    return cy.get(MulticalendarLocators.calendarDateCellByOffset(dateOffset))
      .find(MulticalendarLocators.finalPriceCell);
  }
}

export default MulticalendarPage;
