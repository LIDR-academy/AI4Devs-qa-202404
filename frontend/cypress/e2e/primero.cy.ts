describe("Position Page Test", () => {
  it("Verifica la carga de la Página de Position", () => {
    cy.visit("http://localhost:3000/positions/1");

    // Esperar a que la página se renderice completamente
    cy.wait(2000); // Espera 2 segundos, ajusta según sea necesario

    // Obtener datos del endpoint
    cy.request("http://localhost:3010/positions/1/interviewFlow").then(
      (response) => {
        const {
          positionName,
          interviewFlow: { interviewSteps },
        } = response.body.interviewFlow;

        // Verificar el título de la posición
        cy.get("h2.text-center.mb-4").should("contain.text", positionName);

        // Verificar las columnas de las fases
        interviewSteps.forEach((step: any) => {
          cy.contains(".card-header", step.name).should("be.visible");
        });

        cy.request("http://localhost:3010/positions/1/candidates").then(
          (candidatesResponse) => {
            const candidates = candidatesResponse.body;

            // Verificar las tarjetas de los candidatos en las columnas correctas
            interviewSteps.forEach((step: any, index: any) => {
              cy.get(`[data-rbd-droppable-id="${index}"]`).within(() => {
                candidates
                  .filter(
                    (candidate: any) =>
                      candidate.currentInterviewStep === step.name
                  )
                  .forEach((candidate: any) => {
                    cy.contains(".card-title", candidate.fullName).should(
                      "be.visible"
                    );
                  });
              });
            });
          }
        );
      }
    );
  });
});
