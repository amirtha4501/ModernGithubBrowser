describe('Modern GitHub Browser - Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should type a username in the search input', () => {
    cy.get('app-search input[type="text"]').type('angular');
    cy.get('app-search input[type="text"]').should('have.value', 'angular');
  });

  it('should show loading state when searching', () => {
    // Intercept the API call and delay the response
    cy.intercept('GET', 'https://api.github.com/users/*/repos', {
      delay: 1000,
      fixture: 'repos.json',
    }).as('getRepos');

    cy.searchUser('testuser');

    // The loading message should appear while the request is in-flight
    cy.get('app-repo-list .message')
      .should('be.visible')
      .and('contain.text', 'Loading repositories...');
  });

  it('should display repositories after a successful search', () => {
    cy.intercept('GET', 'https://api.github.com/users/testuser/repos', {
      fixture: 'repos.json',
    }).as('getRepos');

    cy.searchUser('testuser');
    cy.wait('@getRepos');

    // Should display 3 repo cards (matching fixture data)
    cy.get('app-repo-card').should('have.length', 3);
  });

  it('should display "No repositories found." for users with no repos', () => {
    cy.intercept('GET', 'https://api.github.com/users/emptyguy/repos', {
      statusCode: 200,
      body: [],
    }).as('getEmptyRepos');

    cy.searchUser('emptyguy');
    cy.wait('@getEmptyRepos');

    cy.get('app-repo-list .message')
      .should('be.visible')
      .and('contain.text', 'No repositories found.');
  });

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', 'https://api.github.com/users/baduser/repos', {
      statusCode: 404,
      body: { message: 'Not Found' },
    }).as('getReposError');

    cy.searchUser('baduser');
    cy.wait('@getReposError');

    // On error, repos should be cleared and "No repositories found." shown
    cy.get('app-repo-card').should('not.exist');
    cy.get('app-repo-list .message')
      .should('be.visible')
      .and('contain.text', 'No repositories found.');
  });

  it('should not search with an empty username', () => {
    cy.intercept('GET', 'https://api.github.com/users/*/repos').as('getRepos');

    // Clear the input and click search
    cy.get('app-search input[type="text"]').clear();
    cy.get('app-search button').click();

    // The API should not be called
    cy.get('@getRepos.all').should('have.length', 0);

    // Should still show "No repositories found."
    cy.get('app-repo-list .message')
      .should('be.visible')
      .and('contain.text', 'No repositories found.');
  });

  it('should update results when searching for a different user', () => {
    // First search
    cy.intercept('GET', 'https://api.github.com/users/testuser/repos', {
      fixture: 'repos.json',
    }).as('getFirstUser');

    cy.searchUser('testuser');
    cy.wait('@getFirstUser');
    cy.get('app-repo-card').should('have.length', 3);

    // Second search with different results
    cy.intercept('GET', 'https://api.github.com/users/anotheruser/repos', {
      statusCode: 200,
      body: [
        {
          id: 100,
          name: 'single-repo',
          description: 'The only repo',
          html_url: 'https://github.com/anotheruser/single-repo',
          stargazers_count: 10,
          forks_count: 2,
          language: 'JavaScript',
          private: false,
        },
      ],
    }).as('getSecondUser');

    cy.searchUser('anotheruser');
    cy.wait('@getSecondUser');
    cy.get('app-repo-card').should('have.length', 1);
    cy.get('app-repo-card').first().should('contain.text', 'single-repo');
  });
});
