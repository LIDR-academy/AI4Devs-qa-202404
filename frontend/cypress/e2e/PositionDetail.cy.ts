Cypress.config("defaultCommandTimeout", 10000);

describe('Positions page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3010/positions/*/interviewFlow', { fixture: 'positionDetail/interviewSteps.json' }).as('getInterviewFlow');
    cy.intercept('GET', 'http://localhost:3010/positions/*/candidates', { fixture: 'positionDetail/candidates.json' }).as('getCandidates');
    cy.intercept('PUT', 'http://localhost:3010/candidates/*').as('updateCandidateColumn');
  });

  it('loads page and verifies position details', () => {
    cy.visit('http://localhost:3000/positions/1'); // Assuming the application is running locally on port 3000

    cy.wait('@getInterviewFlow');
    cy.wait('@getCandidates');

    // Verify that the title of the position is displayed correctly
    cy.get('.text-center').should('contain', 'Senior Full-Stack Engineer');

    // Verify the title from each stage as the interviewSteps
    cy.get('[aria-label="stage-title"]').each(($stageTitle, index) => {
      cy.get('@getInterviewFlow').then(({response}) => {
        const data = response.body.interviewFlow.interviewFlow.interviewSteps
        expect($stageTitle).to.contain(data[index].name);
      });
    });
    // Verify that the cards of the candidates are displayed in the correct column according to their current phase
    cy.get('[aria-label="candidate-card"]').each(($candidateCard) => {
      cy.get('@getCandidates').then(({ response }) => {
        const candidates = response.body;
        const candidateName = $candidateCard.find('[aria-label="candidate-name"]').text();
        
        const currentPhase = candidates.find(candidate => candidate.fullName === candidateName).currentInterviewStep;
        const stageName = $candidateCard.closest('[aria-label="stage-column"]').find('[aria-label="stage-title"]').text()
        expect(stageName).to.contain(currentPhase);
      });
    });
  });


  it('change a candidate\'s phase by dragging the card to another column', () => {
    cy.visit('http://localhost:3000/positions/1'); // Assuming the application is running locally on port 3000

    cy.wait('@getInterviewFlow');
    cy.wait('@getCandidates');

    // Select the first candidate card and the second column to drop the card into
    cy.get('[aria-label="candidate-card"]').first().as('draggableCard');
    cy.get('[aria-label="stage-column"]').eq(1).as('droppableColumn');

    cy.get('@draggableCard')
      .dragAndDrop('@draggableCard', '@droppableColumn')

    cy.wait('@updateCandidateColumn').its('response.statusCode').should('eq', 200);
  });

});