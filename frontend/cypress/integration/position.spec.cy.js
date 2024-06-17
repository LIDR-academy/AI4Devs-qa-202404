describe('Carga de la Página de Posiciones', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/positions/1'); // Asumiendo que la posición con id 1 existe
  });

  it('El título de la posición se muestra correctamente', () => {
    cy.get('h2').should('contain', 'Senior Full-Stack Engineer'); 
  });

  it('Se muestran las columnas correspondientes a cada fase del proceso de contratación', () => {
    const fases = ['Initial Screening', 'Technical Interview', 'Manager Interview']; 
    fases.forEach(fase => {
      cy.get('.card-header').should('contain', fase);
    });
  });

  it('Las tarjetas de los candidatos se muestran en la columna correcta según su fase actual', () => {
    const fases = ['Initial Screening', 'Technical Interview', 'Manager Interview']; 
    fases.forEach(fase => {
      switch(fase) {
        case 'Initial Screening':
          cy.get('div.text-center.card-header:contains("Initial Screening")')
          .should('exist')
          .parent()
          .contains('div.card-title.h5', 'Carlos García')
          .should('exist');
          break;
        case 'Technical Interview':
          cy.get('div.text-center.card-header:contains("Technical Interview")')
          .should('exist')
          .parent()
          .contains('div.card-title.h5', 'John Doe')
          .should('exist');
          cy.get('div.text-center.card-header:contains("Technical Interview")')
          .should('exist')
          .parent()
          .contains('div.card-title.h5', 'Jane Smith')
          .should('exist');
          break;
        case 'Manager Interview':
          cy.get('div.text-center.card-header:contains("Manager Interview")')
          .should('exist')
          .parent()
          .contains('div.card-title.h5')
          .should('not.exist');
          break;
      }

    });
    
  });
  
});

describe('Cambio de Fase de un Candidato', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/positions/1');
  });

  it('Simula el arrastre de la tarjeta de candidato "John Doe"', () => {
    cy.intercept('PUT', 'http://localhost:3010/candidates/1', (req) => {
      req.reply((res) => {
        res.send({
          applicationId: 1,
          currentInterviewStep: 3
        });
      });
    }).as('updateCandidate');

    cy.dragAndDrop('[data-rbd-draggable-id="1"]', '[data-rbd-droppable-id="1"]');

    cy.get('[data-rbd-droppable-id="2"]').within(() => {
      cy.get('.card-title').should('contain', 'John Doe');
    });

    cy.wait('@updateCandidate').its('response.statusCode').should('eq', 200);
  });
});