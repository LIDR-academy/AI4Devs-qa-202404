describe("Cambio de Fase de un Candidato", () => {
  it("Debería arrastrar la tarjeta de un candidato a una nueva columna y verificar la actualización", () => {
    cy.visit("http://localhost:3000/positions/1"); // Ajusta la URL según sea necesario

    // Verifica la columna inicial del candidato
    cy.get('[data-rbd-draggable-id="3"]').then(($el) => {
      const initialColumn = $el
        .closest("[data-rbd-droppable-id]")
        .attr("data-rbd-droppable-id");
      const targetColumn = initialColumn === "0" ? "1" : "0";

      cy.intercept("PUT", "http://localhost:3010/candidates/3").as(
        "updateCandidate"
      );

      // Simula el arrastre de la tarjeta del candidato
      // @ts-ignore
      cy.get('[data-rbd-draggable-id="3"]').dragAndDrop(
        '[data-rbd-draggable-id="3"]',
        `[data-rbd-droppable-id="${targetColumn}"]`
      );

      cy.wait(1000);

      // Verifica que la tarjeta del candidato se mueve a la nueva columna
      cy.get(`[data-rbd-droppable-id="${targetColumn}"]`).should(
        "contain",
        "Carlos García"
      );

      // Verifica que la fase del candidato se actualiza correctamente en el backend
      cy.wait("@updateCandidate").its("response.statusCode").should("eq", 200);
    });
  });
});
