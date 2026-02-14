describe('Modern GitHub Browser - Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the app title', () => {
    cy.get('h1').should('contain.text', 'Modern GitHub Browser');
  });

  it('should display the search input and button', () => {
    cy.get('app-search input[type="text"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Enter GitHub username');

    cy.get('app-search button')
      .should('be.visible')
      .and('contain.text', 'Search');
  });

  it('should show "No repositories found." message by default', () => {
    cy.get('app-repo-list .message')
      .should('be.visible')
      .and('contain.text', 'No repositories found.');
  });

  it('should not display any repo cards initially', () => {
    cy.get('app-repo-card').should('not.exist');
  });
});
