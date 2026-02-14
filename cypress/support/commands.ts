// ***********************************************
// Custom commands for Modern GitHub Browser
// ***********************************************

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to search for a GitHub user.
     * @param username - The GitHub username to search for
     */
    searchUser(username: string): Chainable<void>;
  }
}

Cypress.Commands.add('searchUser', (username: string) => {
  cy.get('app-search input[type="text"]').clear().type(username);
  cy.get('app-search button').click();
});
