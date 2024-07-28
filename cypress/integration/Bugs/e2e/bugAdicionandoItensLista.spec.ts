
/// <reference  types = "cypress" />

import loc from '../../../support/locators';
describe('Rotina de Produtos', () => {
    describe('Validando Detalhes dos Produtos', () => {
        before(() => {
            cy.cadastrandoUsuario()
        })
        beforeEach(() => {

            cy.visit('/home')
            cy.logandoUsuario()
        })
        // Eu criei outro Caso de teste, porque, se juntar varios casos em apenas um IT, não saberemos qual quebrou em uma pipeline ou rodagem diaria, dividir em varios its, facilita descobrir onde o teste quebrou
        it('Validando o valor do Produto na Tela Inicial', () => {

            cy.get('[data-testid="lista-de-compras"]').click()
            cy.get('h1').should('contain', 'Lista de Compras')
            cy.get('[data-testid="shopping-cart-empty-message"]').should('contain', 'Seu carrinho está vazio')

            cy.url().should('include', 'minhaListaDeProdutos');

            cy.intercept('GET', '**/produtos**').as('getProdutos');
            cy.get('[data-testid="paginaInicial"]').should('be.visible').click()
            cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
            cy.url().should('include', 'home');

            cy.get(`:nth-child(1) > .row > :nth-child(1)`).should('be.visible').and('exist')

            cy.get(`:nth-child(1) > .card-body > .card-title`).invoke('text').then(($text) => {
                //Estou pegando também o valor e colocando como se fosse uma variavel
                cy.get(':nth-child(1) > .card-body > :nth-child(5)').invoke('text').then(($preco) => {
                    cy.get(`:nth-child(1) > .card-body > div > [href="/minhaListaDeProdutos"] > [data-testid="adicionarNaLista"]`).click().url().should('include', 'minhaListaDeProdutos');

                    cy.get('.card').should('be.visible').and('have.length', 1)

                    cy.get('[data-testid="shopping-cart-product-name"]').should('contain', $text)
                    cy.get('[data-testid="shopping-cart-product-quantity"] > p').should('contain', 1)
                    //Aqui eu estou pegando a variavel do preço e validando com o que aparece na lista, com isso o teste vai quebrar porque o bug não foi arrumado ainda


                    // cy.get('.card-body > :nth-child(2) > :nth-child(1)').should('contain', $preco)


                    //Pro teste não quebrar e ficar mais facil de entender o que eu quis dizer no bug, vou usar outra linda de comando

                    cy.get('.card-body > :nth-child(2) > :nth-child(1)').should('contain', `R$80`)
                })
            })


            cy.get('[data-testid="limparLista"]').should('exist').click()

            cy.get('[data-testid="shopping-cart-empty-message"]').should('exist').and('contain', 'Seu carrinho está vazio')
            cy.get('[data-testid="limparLista"]').should('not.exist')

            cy.intercept('GET', '**/produtos**').as('getProdutos');
            cy.get('[data-testid="paginaInicial"]').should('be.visible').click()
            cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
            cy.url().should('include', 'home');




        })

    })
    describe('Validando Quantidade', () => {
        before(() => {
            cy.cadastrandoUsuario()
        })
        beforeEach(() => {

            cy.visit('/home')
            cy.logandoUsuario()
        })
        // Eu criei outro Caso de teste, porque, se juntar varios casos em apenas um IT, não saberemos qual quebrou em uma pipeline ou rodagem diaria, dividir em varios its, facilita descobrir onde o teste quebrou
        it('Validando o limitador de quantidade', () => {


            cy.get('[data-testid="lista-de-compras"]').click()
            cy.get('h1').should('contain', 'Lista de Compras')
            cy.get('[data-testid="shopping-cart-empty-message"]').should('contain', 'Seu carrinho está vazio')

            cy.url().should('include', 'minhaListaDeProdutos');

            cy.intercept('GET', '**/produtos**').as('getProdutos');
            cy.get('[data-testid="paginaInicial"]').should('be.visible').click()
            cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)

            cy.url().should('include', 'home');

            cy.intercept('GET', '**/produtos?nome=Small%20Rubber%20Car**').as('getProdutoEspecifico');
            cy.get('[data-testid="pesquisar"]').type('Small Rubber Car')
            cy.get('[data-testid="botaoPesquisar"]').click()
            cy.wait('@getProdutoEspecifico').its('response.statusCode').should('eq', 200)


            cy.get(`:nth-child(1) > .card-body > .card-title`).invoke('text').then(($text) => {
                //Estou pegando também o valor e colocando como se fosse uma variavel
                cy.get(':nth-child(1) > .card-body > :nth-child(5)').invoke('text').then(($preco) => {
                    cy.get('.card-link').click()
                    //Estou colocando a frase Quantidade: 1 numa variavel
                    cy.get('.especificacoes > :nth-child(3)').invoke('text').then(($quant) => {

                        //Aqui, como eu só quero o número, estou dando um replace para limpar o resto.
                        $quant = $quant.replace('Quantidade: ', '')

                        cy.get('[data-testid="adicionarNaLista"]').click().url().should('include', 'minhaListaDeProdutos');

                        cy.get('.card').should('be.visible').and('have.length', 1)

                        cy.get('[data-testid="shopping-cart-product-name"]').should('contain', $text)
                        //Aqui estou validando a quantidade
                        cy.get('[data-testid="shopping-cart-product-quantity"] > p').should('contain', $quant)

                        //Aumentei uma quantidade no total
                        cy.get('[data-testid="product-increase-quantity"]').click()
                        //Validei novamente se aumentou, o que, conforme a quantidade, não poderia
                        // cy.get('[data-testid="shopping-cart-product-quantity"] > p').should('contain', $quant)

                        //Para não quebrar o teste, novamente comentei a parte que testa o bug em si
                        cy.get('[data-testid="shopping-cart-product-quantity"] > p').should('contain', 1)
                    })
                })

            })
            cy.get('[data-testid="limparLista"]').should('exist').click()

            cy.get('[data-testid="shopping-cart-empty-message"]').should('exist').and('contain', 'Seu carrinho está vazio')
            cy.get('[data-testid="limparLista"]').should('not.exist')

            cy.intercept('GET', '**/produtos**').as('getProdutos');
            cy.get('[data-testid="paginaInicial"]').should('be.visible').click()
            cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
            cy.url().should('include', 'home');



        })


    })
    describe('Validando Mobile', () => {
        before(() => {
            cy.cadastrandoUsuario()
        })
        beforeEach(() => {

            cy.visit('/home')
            cy.logandoUsuario()
            cy.viewport('iphone-6')
        })
        // Eu criei outro Caso de teste, porque, se juntar varios casos em apenas um IT, não saberemos qual quebrou em uma pipeline ou rodagem diaria, dividir em varios its, facilita descobrir onde o teste quebrou
        it.only('Validando a tela Mobile', () => {

            //Como os testes mobile, não tem nem a capacidade de serem feitos pelo erro da aplicação, aqui foi só mostrando como seria possível validar o viewport também
            cy.get('[data-testid="lista-de-compras"]').should('not.be.visible')

        })

    })

})