import MulticalendarPage from '../../pages/MulticalendarPage';
import DSOPanel from '../../pages/DSO/DSOPanel';
import MulticalendarLocators from '../../locators/MulticalendarLocators';

const multicalendarPage = new MulticalendarPage();
const dsoPanel = new DSOPanel();

describe('DSO Functional Tests', () => {
  beforeEach(() => {
    cy.login();
  });

  afterEach(() => {
    cy.logout();
  });

  context('given a single date is selected', () => {
    it('updates the dso for single day', () => {
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
      dsoPanel.updatebutton();
      multicalendarPage.saverow();
    });
  });

  context('DSO API Testing', () => {
    it('update dso for bulk dates', () => {
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
      dsoPanel.updatebutton();
      multicalendarPage.saverow();
    })
  });
});
