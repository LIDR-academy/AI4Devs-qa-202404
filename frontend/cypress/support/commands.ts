export {}; // Esto convierte el archivo en un módulo

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// Añadir la declaración del comando en la interfaz Chainable
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      visit(originalFn: CommandOriginalFn<any>, url: string, options: Partial<VisitOptions>): Chainable<Element>
      dragAndDrop(subject: string, target: string): Chainable<Element>
    }
  }
}

Cypress.Commands.add('dragAndDrop', (subject, target) => {
    cy.get(subject)
    .trigger('mousedown', { which: 1 })
    .trigger('mousemove', { clientX: 100, clientY: 100, force: true });

  cy.get(target)
    .trigger('mousemove', { clientX: 200, clientY: 200, force: true })
    .trigger('mouseup', { force: true });
});