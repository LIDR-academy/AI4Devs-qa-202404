/// <reference types="cypress" />

// Gracias a Felipe Carvalho por el aporte, https://stackoverflow.com/questions/70024270/cypress-drag-and-drop-not-working-on-a-react-based-website

// @ts-ignore
Cypress.Commands.add("dragAndDrop", (subject, target) => {
  Cypress.log({
    name: "DRAGNDROP",
    message: `Dragging element ${subject} to ${target}`,
    consoleProps: () => {
      return {
        subject: subject,
        target: target,
      };
    },
  });
  const BUTTON_INDEX = 0;
  const SLOPPY_CLICK_THRESHOLD = 10;
  cy.get(target)
    .first()
    .then(($target) => {
      let coordsDrop = $target[0].getBoundingClientRect();
      cy.get(subject as any)
        .first()
        .then((subject) => {
          const coordsDrag = subject[0].getBoundingClientRect();
          cy.wrap(subject)
            .trigger("mousedown", {
              button: BUTTON_INDEX,
              clientX: coordsDrag.x,
              clientY: coordsDrag.y,
              force: true,
            })
            .trigger("mousemove", {
              button: BUTTON_INDEX,
              clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
              clientY: coordsDrag.y,
              force: true,
            });
          cy.get("body")
            .trigger("mousemove", {
              button: BUTTON_INDEX,
              clientX: coordsDrop.x,
              clientY: coordsDrop.y,
              force: true,
            })
            .trigger("mouseup");
        });
    });
});
