import MulticalendarLocators from '../../locators/MulticalendarLocators';

Cypress.Commands.add('requestListingsAndExtractId', () => {
  return cy.request({
    method: 'GET',
    url: 'https://app.pricelabs.co/api/listings',
    qs: {
      page_number: '1',
      page_size: '160',
      start_date: '2026-05-29',
      end_date: '2026-11-24',
      cacheBuster: '1780026264180',
      sort_order: 'desc',
      order_by: 'last_synced',
      push_price_status: 'error',
      push_price_status_combination_type: 'exclude',
      start: '1',
      limit: '40',
      user_id: '123641',
      exclude_reasons_json: 'true',
      listingCount: '229'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    const responseBody = response.body;
    cy.writeFile('cypress/fixtures/listings.json', responseBody);
    let listingId;
    let listingsArray = [];
    if (responseBody && responseBody.response && Array.isArray(responseBody.response.data)) {
      listingsArray = responseBody.response.data;
    } else if (responseBody && Array.isArray(responseBody.data)) {
      listingsArray = responseBody.data;
    } else if (responseBody && responseBody.data && Array.isArray(responseBody.data.parent_child_listings)) {
      listingsArray = [responseBody.data];
    }

    for (const item of listingsArray) {
      if (item.parent_child_listings && Array.isArray(item.parent_child_listings) && item.parent_child_listings.length > 0) {
        listingId = item.parent_child_listings[0].listing_id;
      } else if (item.parent_child_listings && item.parent_child_listings.listing_id) {
        listingId = item.parent_child_listings.listing_id;
      }
      if (!listingId && item.listing_id) {
        listingId = item.listing_id;
      }

      if (listingId) break;
    }

    cy.log(`Successfully extracted listing_id from direct request: ${listingId}`);
    Cypress.env('extractedListingId', listingId);

    return cy.wrap(listingId);
  });
});



Cypress.Commands.add('waitForDSOSave', () => {
  cy.wait('@dsoSave').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('waitForCalendarLoad', () => {
  cy.wait('@calendarLoad');
  cy.get(MulticalendarLocators.calendarGrid).should('be.visible');
});


Cypress.Commands.add('waitForSearchResults', () => {
  cy.wait('@searchResults');
});


Cypress.Commands.add('addCustomPricing', (payload) => {
  return cy.request({
    method: 'POST',
    url: 'https://app.pricelabs.co/api/add_custom_pricing',
    body: payload,
    failOnStatusCode: false
  });
});
