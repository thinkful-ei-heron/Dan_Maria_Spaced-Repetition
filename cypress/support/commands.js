import * as helpers from './helpers';

Cypress.Commands.add('login', (options = {}) => {
  // cy.request({
  //   method: 'POST',
  //   url: 'http://localhost:8000/api/auth/token',
  //   body: {
  //     username: 'admin',
  //     password: 'pass'
  //   }
  // })
  //   .its('body')
  //   .then(body => {
  //     console.log(body);
  //     window.localStorage.setItem(Cypress.env('TOKEN_KEY'), body.authToken);
  //   });
  cy.visit('/login')
    .window()
    .then(win => {
      //win.localStorage.setItem(Cypress.env('TOKEN_KEY'), helpers.makeLoginToken());
      Cypress.env('TOKEN_KEY', helpers.makeLoginToken());
      console.log(Cypress.env('TOKEN_KEY'));
    });
});
