import LoginPage from '../../pages/LoginPage';

Cypress.Commands.add('login', () => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  if (!username || !password) {
    throw new Error(
      'Missing credentials: ensure cypress.env.json contains "username" and "password" keys. ' +
      'See cypress.env.json.example for the required format.'
    );
  }

  const loginPage = new LoginPage();
  loginPage.visit();
  loginPage.loginWith(username, password);

  cy.url().should('not.include', '/signin');
});


Cypress.Commands.add('logout', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();
});

Cypress.Commands.add('dismissRecommendationsPopup', () => {
  cy.get('body').type('{esc}');
});

