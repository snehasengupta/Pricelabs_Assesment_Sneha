import MulticalendarPage from '../../pages/MulticalendarPage';
import DSOPanel from '../../pages/DSO/DSOPanel';
import DSOPanelLocators from '../../locators/DSO/DSOPanelLocators';
import MulticalendarLocators from '../../locators/MulticalendarLocators';

const multicalendarPage = new MulticalendarPage();
const dsoPanel = new DSOPanel();

describe('DSO Negative Tests', () => {
  beforeEach(() => {
    cy.login();
    cy.dismissRecommendationsPopup();
  });

  afterEach(() => {
    cy.logout();
  });

  context('given an invalid DSO value is entered', () => {

    it('displays a validation error for non-numeric input', () => {
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
      dsoPanel.invalidpricepercent();
      cy.get(DSOPanelLocators.invalidpercentmessage)
        .should('be.visible')
        .and('contain.text', 'Percentage custom pricing needs to be a number');
    });
  });
});
