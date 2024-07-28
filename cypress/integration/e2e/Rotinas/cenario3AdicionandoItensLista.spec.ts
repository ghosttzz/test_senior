
/// <reference  types = "cypress" />

import loc from '../../../support/locators';

describe('Rotina de Produtos', () => {
    describe('Lista de Compras', () => {
        before(() => {
            cy.cadastrandoUsuario(false)
        })
        beforeEach(() => {

            cy.visit('/home')
            cy.logandoUsuario()
        })
        // Eu criei outro Caso de teste, porque, se juntar varios casos em apenas um IT, não saberemos qual quebrou em uma pipeline ou rodagem diaria, dividir em varios its, facilita descobrir onde o teste quebrou
        it('Adicionando um Item a Lista', () => {

            cy.get(loc.rotinaListaCompras.buttonTelaListaCompras).click()
            cy.get(loc.h1TituloPagina).should('contain', 'Lista de Compras')
            cy.get(loc.rotinaListaCompras.msgCarrinho).should('contain', 'Seu carrinho está vazio')

            cy.url().should('include', 'minhaListaDeProdutos');

            cy.intercept('GET', '**/produtos**').as('getProdutos');
            cy.get(loc.buttonPaginaInicial).should('be.visible').click()
            cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
            cy.url().should('include', 'home');

            cy.get(`:nth-child(1) > .row > :nth-child(1)`).should('be.visible').and('exist')

            cy.get(`:nth-child(1) > .card-body > .card-title`).invoke('text').then(($text) => {
                cy.get(`:nth-child(1) > .card-body > div > [href="/minhaListaDeProdutos"] > [data-testid="adicionarNaLista"]`).click().url().should('include', 'minhaListaDeProdutos');

                cy.get(loc.rotinaListaCompras.cardProduto).should('be.visible').and('have.length', 1)

                cy.get(loc.rotinaListaCompras.divNomeProduct).should('contain', $text)
                cy.get(loc.rotinaListaCompras.divNomeQuantidade).should('contain', 1)
            })

            cy.get(loc.rotinaListaCompras.buttonLimparLista).should('exist').click()

            cy.get(loc.rotinaListaCompras.msgCarrinho).should('exist').and('contain', 'Seu carrinho está vazio')
            cy.get(loc.rotinaListaCompras.buttonLimparLista).should('not.exist')

            cy.intercept('GET', '**/produtos**').as('getProdutos');
            cy.get(loc.buttonPaginaInicial).should('be.visible').click()
            cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
            cy.url().should('include', 'home');




        })
        it('Adicionando Mais de um Item a Lista', () => {

            for (let i = 1; i <= 4; i++) {
                //Aqui, como é uma ação repetida, não vale a pena colocar no locators, e sim colocar dentro do loop
                cy.get(`:nth-child(1) > .row > :nth-child(${i})`).should('be.visible').and('exist')

                cy.get(`:nth-child(${i}) > .card-body > .card-title`).invoke('text').then(($text) => {
                    cy.get(`:nth-child(${i}) > .card-body > div > [href="/minhaListaDeProdutos"] > [data-testid="adicionarNaLista"]`).click().url().should('include', 'minhaListaDeProdutos');
                    //Aqui ja começa a ter htmls fixos, dai colocaremos dentro do locators
                    cy.get(loc.rotinaListaCompras.cardProduto).should('be.visible').and('have.length', i)

                    cy.get(loc.rotinaListaCompras.divNomeProduct).should('contain', $text)
                    cy.get(loc.rotinaListaCompras.divNomeQuantidade).should('contain', 1)
                })

                cy.intercept('GET', '**/produtos**').as('getProdutos');
                cy.get(loc.buttonPaginaInicial).should('be.visible').click()
                cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
                cy.url().should('include', 'home');
            }
            cy.get(loc.rotinaListaCompras.buttonTelaListaCompras).click()


            cy.url().should('include', 'minhaListaDeProdutos');
            cy.get(loc.rotinaListaCompras.buttonLimparLista).should('exist').click()

            cy.get(loc.rotinaListaCompras.msgCarrinho).should('exist').and('contain', 'Seu carrinho está vazio')
            cy.get(loc.rotinaListaCompras.buttonLimparLista).should('not.exist')

        })
    })

})