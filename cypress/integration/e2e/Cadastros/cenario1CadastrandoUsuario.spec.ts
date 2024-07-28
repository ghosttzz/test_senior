
/// <reference  types = "cypress" />

import loc from '../../../support/locators';
import num from '../../../support/commands'
describe('Rotina de Usuario', () => {
  let numUsuario = num.getNumerosAleatorios()
  describe('Cadastrando o Usuario Padrão', () => {
    beforeEach(() => {
      cy.visit('/login')
      //Validando que a tela carregou corretamente
      cy.get(loc.telaInicialLogin).should('be.visible')
    })
    it('Cadastrando o Usuario via Tela de Cadastra-se', () => {
      cy.fixture("e2e/Cadastros/cadastrandoUsuarioData.json").then((infoUsuario) => {

        //Validando os campos de usuario padrão
        cy.get(loc.inputEmail).should('be.visible').and('exist')
        cy.get(loc.inputSenha).should('be.visible').and('exist')

        //Clicando na opção de cadastro e validando que a url mudou
        cy.get(loc.buttonCadastrar).should('be.visible').click()
        cy.url().should('include', 'cadastrarusuarios');
        cy.get(loc.telaCadastraSe.telaInicialCadastro).should('contain', 'Cadastro')

        // Como existe a repetição de usuario no sistema, eu criei uma função que gera alguns numeros aleatorios e vai fazer com que cada usuario cadastrado seja unico
        infoUsuario.nome = infoUsuario.nome + numUsuario
        infoUsuario.email = numUsuario + infoUsuario.email

        //Preenchendo as informações e validando a checkbox desmarcada
        cy.get(loc.telaCadastraSe.inputNome).type(infoUsuario.nome)
        cy.get(loc.inputEmail).type(infoUsuario.email)
        cy.get(loc.telaCadastraSe.inputPassword).type(infoUsuario.senha)

        cy.get(loc.telaCadastraSe.checkboxCadastroADM).should('not.be.checked')

        //Aqui estou validando a resposta do back, e o que ele vai enviar após eu clicar em Cadastrar
        cy.intercept('POST', '**/usuarios**').as('postCadastrandoUsuario');
        cy.intercept('POST', '**/login**').as('postLogandoDepoisDoCadastro');
        cy.get(loc.buttonCadastrar).should('be.enabled').click()
        cy.wait('@postCadastrandoUsuario').its('response.statusCode').should('eq', 201)
        cy.wait('@postLogandoDepoisDoCadastro').its('response.statusCode').should('eq', 200)
        //Validando a mensagem de Cadastro
        cy.get(loc.telaCadastraSe.divAlerta).should('be.visible').and('contain', 'Cadastro realizado com sucesso')

        //Validando redirecionamento de URL
        cy.intercept('GET', '**/usuarios**').as('getUsuarioCadastros');
        cy.wait('@getUsuarioCadastros', {timeout:900000}).its('response.statusCode').should('eq', 200)
        cy.url().should('include', 'home');
        cy.get(loc.telaInicialEcommerce).should('be.visible')


        cy.get(loc.buttonLogout).click()
        cy.url().should('include', 'login');
      })
    })
    // Eu criei outro Caso de teste, porque, se juntar varios casos em apenas um IT, não saberemos qual quebrou em uma pipeline ou rodagem diaria, dividir em varios its, facilita descobrir onde o teste quebrou
    it('Acessando o Usuario Cadastrado', () => {
      cy.fixture("e2e/Cadastros/cadastrandoUsuarioData.json").then((infoUsuario) => {

        //Validando os campos de usuario padrão
        cy.get(loc.inputEmail).should('be.visible').and('exist')
        cy.get(loc.inputSenha).should('be.visible').and('exist')

    
        infoUsuario.nome = infoUsuario.nome + numUsuario
        infoUsuario.email = numUsuario + infoUsuario.email

        //Preenchendo as informações e validando a checkbox desmarcada
        cy.get(loc.inputEmail).type(infoUsuario.email)
        cy.get(loc.inputSenha).type(infoUsuario.senha)

        cy.intercept('POST', '**/login**').as('postLogandoDepoisDoCadastro');
        cy.get(loc.buttonEntrar).click()
  
        cy.wait('@postLogandoDepoisDoCadastro').its('response.statusCode').should('eq', 200)
        

        //Validando redirecionamento de URL. Coloquei APIURL porque tem uma diferença no inicio que seria o front.

        cy.url().should('include', 'home');
        cy.get(loc.telaInicialEcommerce).should('be.visible')

        //Deslogando
        cy.get(loc.buttonLogout).click()
      
        cy.url().should('include', 'login');
      })
    })
  })

})