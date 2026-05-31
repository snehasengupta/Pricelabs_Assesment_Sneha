import MulticalendarPage from '../../pages/MulticalendarPage';
import DSOPanel from '../../pages/DSO/DSOPanel';
import MulticalendarLocators from '../../locators/MulticalendarLocators';
import ApiClient from '../../support/api/ApiClient';

const multicalendarPage = new MulticalendarPage();
const dsoPanel = new DSOPanel();
const apiClient = new ApiClient();

describe('DSO Hybrid API-UI Integration Flow', () => {
  let testPayload;

  beforeEach(() => {
    cy.fixture('addCustomPricing').then((payload) => {
      testPayload = payload;
      
      cy.addCustomPricing(testPayload).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    cy.login();
  });

  afterEach(() => {
    if (testPayload) {
      apiClient.deleteDSO({
        propertyId: testPayload.listingId,
        date: testPayload.actualStartDate
      });
    }
    cy.logout();
  });

  it('reflects backend API custom pricing updates on the browser Multicalendar UI', () => {
    cy.url().should('include', '/multicalendar');
    cy.get(MulticalendarLocators.filterListingsButton, { timeout: 30000 }).should('be.visible');

    multicalendarPage.clickFilterListings();
    multicalendarPage.selectfromlist();
    cy.get(MulticalendarLocators.resultdata).first().should('be.visible');

    cy.get(MulticalendarLocators.scrolltarget).scrollIntoView({ easing: "linear" }).should("be.visible");

    cy.screenshot('updated_screen after_api_hit');
  });
});
