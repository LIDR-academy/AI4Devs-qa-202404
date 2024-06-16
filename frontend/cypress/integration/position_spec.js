describe('Position Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/positions'); // Asegúrate de que la URL es correcta
  });

  it('displays the correct position title', () => {
    cy.contains('Posiciones').should('be.visible');
  });

  it('displays the correct columns for hiring stages', () => {
    cy.get('.column-class-name').should('have.length', 4); // Asegúrate de reemplazar 'column-class-name' con la clase CSS real
  });

  it('displays candidate cards in the correct columns', () => {
    cy.get('.candidate-card-class-name').each(card => {
      cy.wrap(card).find('.stage-class-name').should('contain', 'Nombre de la Etapa'); // Asegúrate de reemplazar los nombres de clase y texto con los valores reales
    });
  });

  it('simulates candidate card drag and drop and verifies the phase change', () => {
    cy.visit('http://localhost:3000/positions');
    cy.get('[data-cy=source-column]').find('[data-cy=candidate-card]').as('sourceCard');
    cy.get('@sourceCard').trigger('dragstart');
    cy.get('[data-cy=destination-column]').trigger('drop');
    cy.get('[data-cy=destination-column]').find('[data-cy=candidate-card]').should('exist');
    cy.request('PUT', '/candidate/:id', { newStage: 'destination-stage' }).its('body').should('include', { currentStage: 'destination-stage' });
  });
});
