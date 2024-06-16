describe('Load position page', () => {
    it('Navigates to Positions and views the first position process', () => {
      // Browse to the homepage
      cy.visit('http://localhost:3000/');
  
      // Click the button that says "Ir a Posiciones"
      cy.contains('button', 'Ir a Posiciones').click();
  
      // Click the first button that says "Ver proceso"
      cy.contains('button', 'Ver proceso').first().click();
  
      // Assert that the page has an <h2> tag with the specified class and text
      cy.get('h2.text-center.mb-4').should('contain.text', 'Senior Full-Stack Engineer');

      // Assert that the page has 3 columns named "Initial Screening", "Technical Interview", "Manager Interview"
      cy.get('div.text-center.card-header').contains('Initial Screening').should('exist');
      cy.get('div.text-center.card-header').contains('Technical Interview').should('exist');
      cy.get('div.text-center.card-header').contains('Manager Interview').should('exist');

      // Assert that there's a candidate called "John Doe" under the "Initial Screening" column
      cy.get('div.text-center.card-header:contains("Initial Screening")')
        .parent()
        .contains('div.card-title.h5', 'John Doe')
        .should('exist');
    });
  });

  describe('Move candidate to next stage', () => {
    it('Moves John Doe from Initial Screening to Technical Interview', () => {
      // Start at the PositionDetails page
      cy.visit('http://localhost:3000/positions/1'); // Adjust the URL as needed
  
      // Ensure the page has loaded correctly
      cy.get('h2.text-center.mb-4').should('contain.text', 'Senior Full-Stack Engineer');

      // Intercept the PUT request
      cy.intercept('PUT', 'http://localhost:3010/candidates/1').as('updateCandidate');
  
      // Drag and drop the first card from Initial Screening to Technical Interview
      cy.get('[data-rbd-draggable-id="1"]').dragAndDrop(
        '[data-rbd-draggable-id="1"]',
        '[data-rbd-droppable-id="1"]'
      );

      // Wait for the PUT request and assert it was fired
      cy.wait('@updateCandidate').its('response.statusCode').should('eq', 200);
  });
});

