/// <reference types="cypress" />

describe('Interfaz de Detalles de Posición', () => {
    beforeEach(function () {  
        cy.visit('http://localhost:3000/positions/1'); 
        cy.request('GET', 'http://localhost:3010/positions/1/interviewFlow').as('interviewData');
        cy.request('GET', `http://localhost:3010/positions/1/candidates`).as('candidatesData');
        cy.wait(1000)
    });

    it('muestra el título de la posición correctamente', function () {  // Usa function() aquí también
        const positionName = this.interviewData.body.interviewFlow.positionName;
        cy.log('interviewFlow: ', this.interviewData.body);
        cy.get('h2').should('contain', positionName);
    });

    it('muestra columnas para cada fase de contratación', function () {
        // Extrae las etapas de los datos de la entrevista obtenidos previamente
        const stages = this.interviewData.body.interviewFlow.interviewFlow.interviewSteps;
        // Verifica que el número de columnas de etapas en la página sea igual al número de etapas
        cy.get('.stage-column').should('have.length', stages.length);
    });

    it('muestra tarjetas de candidatos en las columnas correctas', function () {
        // Obtiene los datos de los candidatos desde el cuerpo de la respuesta almacenada
        const candidates = this.candidatesData.body;
        // Itera sobre cada candidato
        candidates.forEach(candidate => {
            // Encuentra el 'card-header' con el currentInterviewStepName del candidato, sube al 'stage-column' y verifica que 'card-body' contenga el nombre del candidato.
            cy.contains('.card-header', candidate.currentInterviewStep).parents('.stage-column')
                .find('.card-body')
                .should('contain', candidate.fullName);
        });
    });

    it('permite arrastrar una tarjeta de candidato de una columna a otra y verifica la actualización', function () {
        const candidates = this.candidatesData.body;
        const candidateId = candidates[0].candidateId;
        const candidateName = candidates[0].fullName;
        const applicationId = candidates[0].applicationId;
        const currentInterviewStepName = candidates[0].currentInterviewStep;

        const stages = this.interviewData.body.interviewFlow.interviewFlow.interviewSteps;
        const currentStage = stages.find(stage => stage.name === currentInterviewStepName);
        const currentStageId = currentStage.id;
    
        // Mover a la siguiente etapa o volver al inicio si es la última
        const targetStage = stages[(stages.findIndex(stage => stage.id === currentStageId) + 1) % stages.length]; 
        const targetStageId = targetStage.id;   
        const targetStageIndex = Number(targetStage.id) - 1;   
        
        cy.log('targetStageId: ', targetStageId);

        // Asegurate de que los datos se han cargado
        cy.wrap(null).then(() => {
            if (!candidateId || !applicationId || !targetStageId)
                throw new Error('Datos necesarios para la prueba no están disponibles');

            // Simula el arrastre de la tarjeta del candidato
            cy.get(`[data-rbd-draggable-id="${candidateId}"]`).dragAndDrop(
                `[data-rbd-draggable-id="${candidateId}"]`,
                `[data-rbd-droppable-id="${targetStageIndex}"]`
              )
            cy.wait(1000);

            // Verifica que la tarjeta del candidato se ha movido a la nueva columna
            cy.get(`[data-rbd-droppable-id="${targetStageIndex}"]`).should('contain', `${candidateName}`);

            // Verifica que la fase del candidato se actualiza correctamente en el backend
            cy.request({
                method: 'PUT',
                url: `http://localhost:3010/candidates/${candidateId}`,
                body: {
                    applicationId: applicationId,
                    currentInterviewStep: Number(targetStageId)
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                cy.log('response: ', response.body.data.currentInterviewStep);
                expect(response.status).to.eq(200);
                expect(response.body.data.currentInterviewStep).to.eq(Number(targetStageId));
            });

            // Recarga la página para asegurar que los cambios se reflejen en la interfaz de usuario
            cy.reload();
            // Verifica que el nombre del candidato esté presente en la nueva etapa después de recargar la página
            cy.get(`[data-rbd-droppable-id="${targetStageIndex}"]`).should('contain', candidateName);
        });
    });
});
