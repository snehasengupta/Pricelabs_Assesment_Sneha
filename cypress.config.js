// Cypress configuration — central config for all test execution settings
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://pricelabs.co',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    // Viewport — matches common desktop resolution for full calendar grid visibility
    viewportWidth: 1920,
    viewportHeight: 1080,

    // Timeouts — generous defaults for a real SaaS app with network latency
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 120000,

    // Media — disable video to save CI time; screenshots on failure are kept
    video: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',

    // Mochawesome reporter — self-contained HTML report with embedded screenshots
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      overwrite: false,
      html: true,
      json: true,
      embeddedScreenshots: true,
      inlineAssets: true,
    },

    setupNodeEvents(on, config) {
      // Register Mochawesome reporter plugin for screenshot embedding
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
