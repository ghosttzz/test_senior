
/// <reference  types = "cypress" />

import loc from '../../../support/locators';
import num from '../../../support/commands'
describe('Rotina de Usuarios', () => {
    let numUsuario = num.getNumerosAleatorios()
    describe('Cadastrando um Usuario', () => {
        before(() => {
            cy.cadastrandoUsuario(true)
        })
        beforeEach(() => {
            cy.visit('/home')
            cy.logandoUsuario()
        })
        // Eu criei outro Caso de teste, porque, se juntar varios casos em apenas um IT, não saberemos qual quebrou em uma pipeline ou rodagem diaria, dividir em varios its, facilita descobrir onde o teste quebrou
        it('Cadastrando um Usuário', () => {
            cy.fixture("e2e/Cadastros/cadastrandoUsuarioData.json").then((infoUsuario) => {
                cy.url().should('include', '/admin/home');

                cy.get(loc.telaUsuario.buttonTelaCadastrarUsuario).click()

                cy.get(loc.h1TituloPagina).should('contain', 'Cadastro de usuários')
                cy.url().should('include', '/admin/cadastrarusuarios');

                infoUsuario.nome = infoUsuario.nome + numUsuario
                infoUsuario.email = numUsuario + infoUsuario.email

                //Preenchendo as informações e validando a checkbox desmarcada
                cy.get(loc.telaUsuario.inputNome).type(infoUsuario.nome)
                cy.get(loc.telaUsuario.inputEmail).type(infoUsuario.email)
                cy.get(loc.telaUsuario.inputPassword).type(infoUsuario.senha)

                cy.get(loc.telaCadastraSe.checkboxCadastroADM).should('not.be.checked')
                cy.intercept('POST', '**/usuarios**').as('postCadastrandoUsuario');
                cy.get(loc.telaUsuario.buttonCadastrandoUsuario).click()
                cy.wait('@postCadastrandoUsuario').its('response.statusCode').should('eq', 201)
                cy.url().should('include', '/admin/listarusuarios');

            })
        })
        it('Editando um Usuario', () => {
            cy.fixture("e2e/Cadastros/cadastrandoUsuarioData.json").then((infoUsuario) => {
                infoUsuario.nome = infoUsuario.nome + numUsuario
                cy.url().should('include', '/admin/home');
                cy.get(loc.telaUsuario.buttonListarUsuario).click()
                cy.url().should('include', '/admin/listarusuarios');

                cy.get(loc.h1TituloPagina).should('contain', 'Lista dos usuários')

                //Como o botão editar não está funcionando, o teste não continua, mas basicamente seria editar para valores diferentes, e validar o salvamento das informações
                cy.get(loc.telaResultados).contains(infoUsuario.nome).parent().contains('Editar').click()

            })
        })
        it('Excluindo um Usuario', () => {
            cy.fixture("e2e/Cadastros/cadastrandoUsuarioData.json").then((infoUsuario) => {
                infoUsuario.nome = infoUsuario.nome + numUsuario

                cy.url().should('include', '/admin/home');
                cy.get(loc.telaUsuario.buttonListarUsuario).click()
                cy.url().should('include', '/admin/listarusuarios');

                cy.get(loc.h1TituloPagina).should('contain', 'Lista dos usuários')

                //Como o botão editar não está funcionando, o teste não continua, mas basicamente seria editar para valores diferentes, e validar o salvamento das informações
                cy.intercept('DELETE', '**/usuarios/**').as('deleteUsuarios');
                cy.get(loc.telaResultados).contains(infoUsuario.nome).parent().contains('Excluir').click()
                cy.wait('@deleteUsuarios').its('response.statusCode').should('eq', 200)
                cy.get(loc.telaResultados).should('not.contain', infoUsuario.nome)

            })
        })
    })

})