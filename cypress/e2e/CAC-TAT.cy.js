describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  });

  it('Verificar o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })


  it('Preenche os campos obrigatórios e envia o formulário', () => {

    cy.get('#firstName').type('Binho')
    cy.get('#lastName').type('Claro')
    cy.get('#email').type('binho@teste.com.br')
    cy.get('#open-text-area').type('Fazendo validação de teste Fazendo validação de testeFazendo validação de testeFazendo validação de testeFazendo validação de teste', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it('Preenchendo com textos maiores de forma instantânea', () => {
    const longText = Cypress._.repeat('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10) //lowdash

    cy.get('#firstName').type('Binho')
    cy.get('#lastName').type('Claro')
    cy.get('#email').type('binho@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it('Exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Binho')
    cy.get('#lastName').type('Claro')
    cy.get('#email').type('binho@teste.com,br')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('o campo telefone não deve aceitar valores não-numéricos', () => {
    cy.get('#phone')
      .type('abcd')
      .should('have.value', '')
  })

  it('exibir mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Binho')
    cy.get('#lastName').type('Claro')
    cy.get('#email').type('binho@teste.com,br')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Binho').should('have.value', 'Binho').clear().should('have.value', '')
    cy.get('#lastName').type('Claro').should('have.value', 'Claro').clear().should('have.value', '')
    cy.get('#email').type('binho@teste.com,br').should('have.value', 'binho@teste.com,br').clear().should('have.value', '')
    cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('have.value', '')
  })

  it('Exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Enviar o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it('Enviar o formuário com sucesso usando um comando customizado e objeto', () => {
    const data = {
      firstName: 'fabio',
      lastName: 'Claro',
      email: 'binho@teste.com',
      text: 'Teste.'
    }

    cy.fillMandatoryFieldsAndSubmit2(data)

    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it('Enviar o formuário com sucesso usando um comando customizado e preencher defalt', () => {
    cy.fillMandatoryFieldsAndSubmit3()

    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it('Selecionar um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('Selecionar um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('Selecionar um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('Marcar o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService).check().should('be.checked')
    })
  })

  it('Marcar ambos checkboxes, depois desmarca o último"', () => {
    cy.get('input[type=checkbox]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })

  it('verificar que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank' )
  })

it('Acessar a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.contains('a', 'Política de Privacidade')
  .invoke('removeAttr', 'target')
  .click()
  
  cy.contains('h1', 'CAC TAT - Política de Privacidade')
  .should('be.visible')
})



})
