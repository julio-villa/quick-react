/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    // it ('defaults to fall', () => {
    //   cy.visit ('/');
    //   cy.get('[data-cy=course]').should('containe', 'Fall CS')
    // });
  
  });