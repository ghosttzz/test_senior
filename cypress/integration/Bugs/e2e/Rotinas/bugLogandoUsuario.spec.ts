
/// <reference  types = "cypress" />

import loc from '../../../../support/locators';
import num from '../../../../support/commands'
describe('Rotina de Usuario', () => {

    describe('Validando Campos Obrigatórios', () => {
        before(() => {
            cy.cadastrandoUsuario(false)
        })
        beforeEach(() => {

            cy.visit('/home')

        })
        // Eu criei outro Caso de teste, porque, se juntar varios casos em apenas um IT, não saberemos qual quebrou em uma pipeline ou rodagem diaria, dividir em varios its, facilita descobrir onde o teste quebrou
        it('Acessando o Usuario Cadastrado sem preencher Senha', () => {
            cy.fixture("e2e/Rotinas/logandoUsuarioData.json").then((infoUsuario) => {

                //Validando os campos de usuario padrão
                cy.get(loc.inputEmail).should('be.visible').and('exist')
                cy.get(loc.inputSenha).should('be.visible').and('exist')


                infoUsuario.nome = infoUsuario.nome + num.numUsuario
                infoUsuario.email = num.numUsuario + infoUsuario.email

                //Preenchendo as informações e validando a checkbox desmarcada
                cy.get(loc.inputEmail).type(infoUsuario.email)


                cy.intercept('POST', '**/login**').as('postLogandoDepoisDoCadastro');
                cy.get(loc.buttonEntrar).click()
                cy.wait('@postLogandoDepoisDoCadastro').its('response.statusCode').should('eq', 400)
                //Aqui eu estou validando o que seria o resultado esperado, é possivel que esse teste dê erro, porque o bug não foi consertado, mas seria mais ou menos uma amostra de como ficaria em automatizar esse bug
                cy.get(loc.divAlerta).should('contain', 'Password é obrigatório')
                //.and('not.contain', 'não pode ficar em branco')




                //Validando redirecionamento de URL. Coloquei APIURL porque tem uma diferença no inicio que seria o front.




            })
        })
        it('Acessando o Usuario Cadastrado sem preencher Email', () => {
            cy.fixture("e2e/Rotinas/logandoUsuarioData.json").then((infoUsuario) => {

                //Validando os campos de usuario padrão
                cy.get(loc.inputEmail).should('be.visible').and('exist')
                cy.get(loc.inputSenha).should('be.visible').and('exist')


                infoUsuario.nome = infoUsuario.nome + num.numUsuario
                infoUsuario.email = num.numUsuario + infoUsuario.email

                //Preenchendo as informações e validando a checkbox desmarcada

                cy.get(loc.inputSenha).type(infoUsuario.senha)

                cy.intercept('POST', '**/login**').as('postLogandoDepoisDoCadastro');
                cy.get(loc.buttonEntrar).click()
                cy.wait('@postLogandoDepoisDoCadastro').its('response.statusCode').should('eq', 400)

                cy.get(loc.divAlerta).should('contain', 'Email é obrigatório').and('not.contain', 'não pode ficar em branco')
                //Validando redirecionamento de URL. Coloquei APIURL porque tem uma diferença no inicio que seria o front.




            })
        })
    })
    describe('Validando Mensagens', () => {
        before(() => {
            cy.cadastrandoUsuario(false)
        })
        beforeEach(() => {

            cy.visit('/home')

        })
        it('Validando Mensagem e a linguagem da Senha', () => {
            cy.fixture("e2e/Rotinas/logandoUsuarioData.json").then((infoUsuario) => {
                //Validando os campos de usuario padrão
                cy.get(loc.inputEmail).should('be.visible').and('exist')
                cy.get(loc.inputSenha).should('be.visible').and('exist')


                infoUsuario.nome = infoUsuario.nome + num.numUsuario
                infoUsuario.email = num.numUsuario + infoUsuario.email

                //Preenchendo as informações e validando a checkbox desmarcada

                cy.get(loc.inputSenha).type(infoUsuario.senha)

                cy.intercept('POST', '**/login**').as('postLogandoDepoisDoCadastro');
                cy.get(loc.buttonEntrar).click()
                cy.wait('@postLogandoDepoisDoCadastro').its('response.statusCode').should('eq', 400)

               
                cy.intercept('POST', '**/login**').as('postLogandoDepoisDoCadastro');
                cy.get(loc.buttonEntrar).click()
                cy.wait('@postLogandoDepoisDoCadastro').its('response.statusCode').should('eq', 400)
                //Aqui eu estou validando o que seria o resultado esperado, é possivel que esse teste dê erro, porque o bug não foi consertado, mas seria mais ou menos uma amostra de como ficaria em automatizar esse bug
                // cy.get(loc.divAlerta)
                // .should('contain', 'Senha é obrigatório')
              
                cy.get(loc.divAlerta)
                .should('contain', 'Password é obrigatório')
              

            })
        })
    })
})

