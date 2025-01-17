
/// <reference  types = "cypress" />

import loc from '../../../support/locators';
import num from '../../../support/commands'
describe('Rotina de Usuario', () => {
   num.numUsuario = num.getNumerosAleatorios()
    describe('Logando com Usuario Padrão', () => {
        beforeEach(() => {
      
            cy.visit('/home')

        })
        it('Cadastrando um Usuario', () => {
           //Aqui estou c
           let bodyEndPoint = {
               "nome": `${num.numUsuario}UsuarioAutomatico`,
               "email": `${num.numUsuario}testUsuarioAutomatico@gmail.com`,
               "password": "teste",
               "administrador": `${false}`
           }
           cy.request({
               method: 'POST',
               body: bodyEndPoint,
               failOnStatusCode: false,
               url: `${Cypress.env('apiUrl')}/usuarios`
           }).then(resp => {
               // expect(resp.status).eq(201);
               expect(resp.body.message).eq('Cadastro realizado com sucesso')
           })
           
       })
        // Eu criei outro Caso de teste, porque, se juntar varios casos em apenas um IT, não saberemos qual quebrou em uma pipeline ou rodagem diaria, dividir em varios its, facilita descobrir onde o teste quebrou
        it('Acessando o Usuario Cadastrado', () => {
            cy.fixture("e2e/Rotinas/logandoUsuarioData.json").then((infoUsuario) => {

                //Validando os campos de usuario padrão
                cy.get(loc.inputEmail).should('be.visible').and('exist')
                cy.get(loc.inputSenha).should('be.visible').and('exist')


                infoUsuario.nome = infoUsuario.nome + num.numUsuario
                infoUsuario.email = num.numUsuario + infoUsuario.email

                //Preenchendo as informações e validando a checkbox desmarcada
                cy.get(loc.inputEmail).type(infoUsuario.email)
                cy.get(loc.inputSenha).type(infoUsuario.senha)

                cy.intercept('POST', '**/login**').as('postLogandoDepoisDoCadastro');
                cy.get(loc.buttonEntrar).click()

                cy.wait('@postLogandoDepoisDoCadastro').its('response.statusCode').should('eq', 200)


                //Validando redirecionamento de URL. Coloquei APIURL porque tem uma diferença no inicio que seria o front.

                cy.url().should('include', 'home');
                cy.get(loc.telaInicialEcommerce).should('be.visible')

             
            })
        })
    })

})