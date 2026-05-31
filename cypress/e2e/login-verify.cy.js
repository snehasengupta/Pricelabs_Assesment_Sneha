import LoginPage from '../pages/LoginPage';
import LoginLocators from '../locators/LoginLocators';

const loginPage = new LoginPage();

describe('Login Verification', () => {
  it('valid login', () => {
    cy.login();

    cy.url().should('not.include', '/signin');
    cy.url().should('not.include', '/sign_in');

    cy.get('body').should('be.visible');
  });

  it('login with invalid credentials', () => {
    loginPage.visit();
    cy.fixture('users').then((users) => {
      const invalid = users.invalidUser;
      loginPage.Invalidlogin(invalid.email, invalid.password);

      cy.get(LoginLocators.errorMessage)
        .should('be.visible')
        .and('contain.text', 'Invalid email or password.');
    });
  });
});
