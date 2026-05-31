import BasePage from './BasePage';
import LoginLocators from '../locators/LoginLocators';

class LoginPage extends BasePage {
  /**
   * Navigate to the sign-in page.
   * @returns {LoginPage} this
   */
  visit() {
    super.visit('/signin');
    return this;
  }

  /**
   * Enter credentials and submit the login form.
   * @param {string} email — the user's email address
   * @param {string} password — the user's password
   * @returns {LoginPage} this
   */
  loginWith(email, password) {
    cy.get(LoginLocators.emailInput).clear().type(email);
    cy.get(LoginLocators.passwordInput).clear().type(password, { log: false });
    cy.get(LoginLocators.submitButton).click();
    return this;
  }
  Invalidlogin(email, password) {
    cy.get(LoginLocators.emailInput).clear().type(email);
    cy.get(LoginLocators.passwordInput).clear().type(password, { log: false });
    cy.get(LoginLocators.submitButton).click();
    return this;
  }
}

export default LoginPage;
