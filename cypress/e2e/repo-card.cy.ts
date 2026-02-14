describe('Modern GitHub Browser - Repo Card Details', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.github.com/users/testuser/repos', {
      fixture: 'repos.json',
    }).as('getRepos');

    cy.visit('/');
    cy.searchUser('testuser');
    cy.wait('@getRepos');
  });

  it('should display the repository name in each card', () => {
    cy.get('app-repo-card').eq(0).find('h3').should('contain.text', 'awesome-project');
    cy.get('app-repo-card').eq(1).find('h3').should('contain.text', 'secret-tool');
    cy.get('app-repo-card').eq(2).find('h3').should('contain.text', 'no-desc-repo');
  });

  it('should display public/private badges correctly', () => {
    // First repo is public
    cy.get('app-repo-card').eq(0).find('.badge').should('contain.text', 'Public');

    // Second repo is private
    cy.get('app-repo-card').eq(1).find('.badge').should('contain.text', 'Private');

    // Third repo is public
    cy.get('app-repo-card').eq(2).find('.badge').should('contain.text', 'Public');
  });

  it('should display the repository description', () => {
    cy.get('app-repo-card').eq(0).find('.description')
      .should('contain.text', 'An awesome open-source project');
  });

  it('should show fallback text when description is null', () => {
    cy.get('app-repo-card').eq(2).find('.description')
      .should('contain.text', 'No description provided.');
  });

  it('should display star and fork counts', () => {
    cy.get('app-repo-card').eq(0).should('contain.text', '150'); // stars
    cy.get('app-repo-card').eq(0).should('contain.text', '42');  // forks
  });

  it('should display the programming language when available', () => {
    cy.get('app-repo-card').eq(0).find('.language')
      .should('be.visible')
      .and('contain.text', 'TypeScript');

    cy.get('app-repo-card').eq(1).find('.language')
      .should('be.visible')
      .and('contain.text', 'Python');
  });

  it('should not display language when it is null', () => {
    cy.get('app-repo-card').eq(2).find('.language').should('not.exist');
  });

  it('should have a "View on GitHub" link for each repo', () => {
    cy.get('app-repo-card').eq(0).find('a.repo-button')
      .should('have.attr', 'href', 'https://github.com/testuser/awesome-project')
      .and('have.attr', 'target', '_blank')
      .and('contain.text', 'View on GitHub');
  });
});
