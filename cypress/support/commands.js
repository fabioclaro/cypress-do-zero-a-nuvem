Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Binho')
    cy.get('#lastName').type('Claro')
    cy.get('#email').type('binho@teste.com.br')
    cy.get('#open-text-area').type('Teste.')
    cy.contains('button', 'Enviar').click()
}),

    Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', data => {
        cy.get('#firstName').type(data.firstName)
        cy.get('#lastName').type(data.lastName)
        cy.get('#email').type(data.email)
        cy.get('#open-text-area').type(data.text)
        cy.contains('button', 'Enviar').click()
    }),

    Cypress.Commands.add('fillMandatoryFieldsAndSubmit3', (data = {
        firstName: 'Lipe',
        lastName: 'Claro',
        email: 'lipe@teste.com',
        text: 'Teste.'
    }) => {
        cy.get('#firstName').type(data.firstName)
        cy.get('#lastName').type(data.lastName)
        cy.get('#email').type(data.email)
        cy.get('#open-text-area').type(data.text)
        cy.contains('button', 'Enviar').click()
    })