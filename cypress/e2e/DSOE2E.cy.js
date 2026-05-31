
import MulticalendarPage from '../pages/MulticalendarPage';
import DSOPanel from '../pages/DSO/DSOPanel';
import MulticalendarLocators from '../locators/MulticalendarLocators';

const multicalendarPage = new MulticalendarPage();
const dsoPanel = new DSOPanel();

describe('PriceLabs Multicalendar Flow', () => {
  beforeEach(() => {
    cy.login();
    cy.get('body').type('{esc}');
  });

  it('e2e flow for single day', () => {
    cy.url().should('include', '/multicalendar');
    cy.get(MulticalendarLocators.filterListingsButton, { timeout: 30000 }).should('be.visible').should('not.have.attr', 'disabled');
    multicalendarPage.clickFilterListings();
    cy.requestListingsAndExtractId().then((listingId) => {
      expect(listingId).to.not.be.undefined;
    });
    multicalendarPage.selectfromlist();
    cy.get(MulticalendarLocators.resultdata).first().should('be.visible');
    multicalendarPage.clickDateCell();
    dsoPanel.selectdate();
    dsoPanel.passprice();
    dsoPanel.passstay();
    dsoPanel.addbutton();

    dsoPanel.openPanel();

    dsoPanel.getPriceSummary();
    dsoPanel.closePanelWithoutSaving();
    dsoPanel.fetchFinalPrice();

    cy.get('@totalValue').then((total) => {
      cy.get('@finalPrice').then((final) => {
        cy.log(`Total = ${total} | Final = ${final}`);
        expect(total, 'DSO total should equal hover Final price').to.eq(final);
      });
    });
  });
  it('e2e flow for bulk dates', () => {
    cy.url().should('include', '/multicalendar');
    cy.get(MulticalendarLocators.filterListingsButton, { timeout: 30000 }).should('be.visible').should('not.have.attr', 'disabled');
    multicalendarPage.clickFilterListings();
    cy.requestListingsAndExtractId().then((listingId) => {
      expect(listingId).to.not.be.undefined;
    });
    multicalendarPage.selectfromlist();
    cy.get(MulticalendarLocators.resultdata).first().should('be.visible');
    multicalendarPage.Clicknextdatecell();
    dsoPanel.selectbulkdate();
    dsoPanel.passprice();
    dsoPanel.passstay();
    dsoPanel.addbutton();

    dsoPanel.openPanel();

    dsoPanel.getPriceSummary();
    dsoPanel.closePanelWithoutSaving();
    dsoPanel.fetchFinalPrice();

    cy.get('@totalValue').then((total) => {
      cy.get('@finalPrice').then((final) => {
        cy.log(`Total = ${total} | Final = ${final}`);
        expect(total, 'DSO total should equal hover Final price').to.eq(final);
      });
    });
  });
});
