import 'cypress-mochawesome-reporter/register';

import './commands/auth.commands';
import './commands/network.commands';

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Script error')) {
    return false;
  }
});
