/// <reference types="cypress" />

context('Cart', () => {
  beforeEach(() => {
    cy.visit('https://applitools-cypress-workshop-demo.netlify.app/');
  })

  it('add an item to the cart and go to cart', () => {
    cy.eyesOpen({
      appName: 'My Video Game Store',
      testName: 'Adding to Cart'
    });

    cy.eyesCheckWindow('Homepage');

    // Find a game from the list and navigate to it

    cy.get('#games li').eq(1).then($game => {
      const id = $game[0].id.replace('game-', '');
      cy.wrap($game).find('a').click();
      cy.url().should('include', `/games/${id}`);
    });

    cy.eyesCheckWindow('Product Page');

    // Add that game to the cart

    cy.get('#button-add-to-cart').click();

    // Make sure the subtotal is equal to the cost of the game

    cy.get('#cart-subtotal').then($cartSubtotal => {
      cy.get('#game-price').should($gamePrice => {
        expect($gamePrice.text()).to.eq($cartSubtotal.text());
      });
    });

    // Go to cart

    cy.get('#cart-menu').invoke('show');

    cy.eyesCheckWindow('Product Page with Cart');

    cy.get('#cart-button').click();

    cy.url().should('include', '/cart');

    cy.eyesCheckWindow('Cart Page');

    cy.eyesClose();
  });
})