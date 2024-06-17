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

