import { login } from "./commands/login";

Cypress.Commands.add('login', login);

declare global {
  namespace Cypress {
    interface Chainable {
      // чтобы автокомпл. работал:
      login(email?: string, password?: string): Chainable<void>;
    }
  }
}

// набор некоторого функц., который можем зашить внутрь cypressa
// и в нужных местах исп.