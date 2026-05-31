import DSOPanelLocators from '../../locators/DSO/DSOPanelLocators';
import MulticalendarLocators from '../../locators/MulticalendarLocators';

class DSOPanel {
  /**
   * Open the DSO panel. Assumes a date cell has already been clicked
   * to trigger the panel opening.
   * @returns {DSOPanel} this
   */
  openPanel() {
    cy.get(MulticalendarLocators.calendarDateCell).click({ force: true });
    cy.get(DSOPanelLocators.panelModal).should('be.visible');
    return this;
  }

  selectdate() {
    cy.get(DSOPanelLocators.datePickerCalendar).eq(1).click();
    cy.get(DSOPanelLocators.datecell).click();
    cy.get(DSOPanelLocators.datecell).click();
    return this;
  }
  selectbulkdate() {
    cy.get(DSOPanelLocators.datePickerCalendar).eq(1).click();
    cy.get(DSOPanelLocators.datecell).click();
    cy.get(DSOPanelLocators.bulkdatemonth).last()
      .find(DSOPanelLocators.blkdatstart)
      .not(DSOPanelLocators.outsideMonth)
      .click();
    return this;
  }

  passprice() {
    cy.fixture('dsopanel').then((data) => {
      cy.get(DSOPanelLocators.pricepercent).type(data.pricePercent);
      cy.get(DSOPanelLocators.dsominmum).parent().find(DSOPanelLocators.addprice).click();
      cy.get(DSOPanelLocators.addminprice).type(data.minPrice);
      cy.get(DSOPanelLocators.dsomaximum).parent().find(DSOPanelLocators.addprice).click();
      cy.get(DSOPanelLocators.addmaxprice).type(data.maxPrice);
      cy.get(DSOPanelLocators.dsobaseprice).click();
      cy.get(DSOPanelLocators.addbaseprice).type(data.basePrice);
    });
    return this;
  }
  invalidpricepercent() {
    cy.get(DSOPanelLocators.pricepercent).type('abc');
    cy.get(DSOPanelLocators.dsominmum).parent().find(DSOPanelLocators.addprice).click();

    return this;
  }

  passstay() {
    cy.get(DSOPanelLocators.minstay).type('1');
    return this;
  }
  addbutton() {
    cy.get(DSOPanelLocators.dsoaddbutton).click();
    return this;
  }
  updatebutton() {
    cy.get(DSOPanelLocators.updatebutton).click();
    return this;
  }

  /**
   * Get the price summary element for assertion in test files.
   * @returns {Cypress.Chainable} — the price summary element
   */
  getPriceSummary() {
    cy.contains('p.chakra-text', 'Total:')
      .next('p.chakra-text')
      .invoke('text')
      .then((t) => Number(t.replace(/[^\d.]/g, '')))
      .as('totalValue');
  }
  fetchFinalPrice() {
    cy.get(DSOPanelLocators.finalPriceDisplay).trigger('mouseover');
    cy.contains('p', /^Final$/).scrollIntoView().should('be.visible');
    cy.contains('p', /^Final$/)
      .parent()
      .invoke('text')
      .then((text) => {
        const finalPrice = Number(text.replace(/[^\d.]/g, ''));
        cy.wrap(finalPrice).as('finalPrice');
      });
    return this;
  }

  /**
   * Close the panel without saving.
   * @returns {DSOPanel} this
   */
  closePanelWithoutSaving() {
    cy.get(DSOPanelLocators.cancelButton).click();
    return this;
  }
}

export default DSOPanel;
