
describe('Positions Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/positions');
    });
  
    it('should display the position title correctly', () => {
      cy.contains('h2', 'Posiciones').should('be.visible');
    });
  
    it('should display columns for each hiring stage', () => {
      const stages = ['Initial Screening', 'Technical Interview', 'Manager Interview'];
      stages.forEach(stage => {
        cy.contains(stage).should('be.visible');
      });
    });
  
    it('should display candidate cards in the correct column based on their current stage', () => {
      cy.get('[data-stage="Initial Screening"]').within(() => {
        cy.contains('John Doe').should('be.visible');
      });
      cy.get('[data-stage="Technical Interview"]').within(() => {
        cy.contains('Jane Smith').should('be.visible');
      });
    });


    it('should move a candidate card to a new column and update the backend', () => {
      // Simulate dragging a candidate card
      cy.get('[data-stage="Initial Screening"] .candidate-card')
        .trigger('dragstart');
      cy.get('[data-stage="Technical Interview"]')
        .trigger('drop');
  
      // Verify the candidate card moved to the new column
      cy.get('[data-stage="Technical Interview"]').within(() => {
        cy.contains('John Doe').should('be.visible');
      });
  
      // Verify the backend update
      cy.intercept('PUT', '/candidates/*').as('updateCandidate');
      cy.wait('@updateCandidate').its('response.statusCode').should('eq', 200);
    });
  });