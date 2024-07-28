/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference  types = "cypress" />
import cd from '../../support/commands'
describe('Endpoints de Produtos ', () => {
    let numProdutoDiferencial = cd.getNumerosAleatorios()
    describe('Fazendo o processo de criação de Produto', () => {

        before(() => {
            cy.cadastrandoUsuario(true)
        })
        beforeEach(() => {
            cy.setandoToken()
            cy.getToken('token').then(($token) => {
                cy.wrap($token).as('token')
            })
        })

        it('Buscando os Produtos com o Metodo GET', function () {
            cy.fixture("API/produtoAPI.json").then((body) => {
                body.post.nome = body.post.nome + numProdutoDiferencial
                cy.request({
                    method: 'GET',
                    failOnStatusCode: false,
                    url: `${Cypress.env('apiUrl')}/produtos`
                }).then(resp => {
                    expect(resp.status).eq(200);
                    expect(resp.body).not.be.empty
                    expect(resp.body.produtos).not.includes(body.post.nome)
                })
            })
        })

        it('Criando um Produto com o Metodo POST', function () {
            cy.fixture("API/produto.json").then((body) => {
                body.post.nome = body.post.nome + numProdutoDiferencial
                cy.get('@token', { log: false }).then((refToken) => {


                    cy.request({
                        method: 'POST',
                        body: body.post,
                        failOnStatusCode: false,
                        url: `${Cypress.env('apiUrl')}/produtos`,
                        auth: {
                            'bearer': refToken
                        },
                    }).then(resp => {
                        expect(resp.status).eq(201);
                        expect(resp.body).not.be.empty
                        expect(resp.body.message).includes('Cadastro realizado com sucesso')
                    })
                })
            })
        })

        it('Validando se o Produto foi Criado', function () {
            cy.fixture("API/produto.json").then((body) => {
                body.post.nome = body.post.nome + numProdutoDiferencial
                cy.request({
                    method: 'GET',
                    failOnStatusCode: false,
                    url: `${Cypress.env('apiUrl')}/produtos`
                }).then(resp => {
                    expect(resp.status).eq(200);
                    expect(resp.body).not.be.empty
                    //aqui eu estou verificando se existe algum produto na lista, com o nome dito, e vai retornar true se tiver e false se não tiver
                    expect(resp.body.produtos.some(produto => produto.nome === body.post.nome)).to.be.true

                })
            })
        })
    })
    describe('Validando Mensagens de Erro de produto', () => {

        before(() => {
            cy.cadastrandoUsuario(true)
        })
        beforeEach(() => {
            cy.setandoToken()
            cy.getToken('token').then(($token) => {
                cy.wrap($token).as('token')
            })
        })
        it('Rota Exclusiva para Administradores', function () {
            //Aqui eu precisei colocar novamente o cadastrandoUsuario e setandoToken porque essa rota precisa de um usuario sem ser adm
            cy.cadastrandoUsuario(false)
            cy.setandoToken()
            cy.getToken('token').then(($token) => {
                cy.wrap($token).as('token')
            })
            cy.fixture("API/produto.json").then((body) => {
                body.post.nome = body.post.nome + numProdutoDiferencial
                cy.get('@token', { log: false }).then((refToken) => {

                    cy.request({
                        method: 'POST',
                        body: body.post,
                        failOnStatusCode: false,
                        url: `${Cypress.env('apiUrl')}/produtos`,
                        auth: {
                            'bearer': refToken
                        },
                    }).then(resp => {
                        expect(resp.status).eq(403);
                        expect(resp.body).not.be.empty
                        expect(resp.body.message).includes('Rota exclusiva para administradores')
                    })
                })
            })
            cy.cadastrandoUsuario(true)
        })
        it('Token Ausente', function () {
            cy.fixture("API/produto.json").then((body) => {
                body.post.nome = body.post.nome + numProdutoDiferencial
                cy.get('@token', { log: false }).then((refToken) => {
                    refToken = null
                    cy.request({
                        method: 'POST',
                        body: body.post,
                        failOnStatusCode: false,
                        url: `${Cypress.env('apiUrl')}/produtos`,
                        auth: {
                            'bearer': refToken
                        },
                    }).then(resp => {
                        expect(resp.status).eq(401);
                        expect(resp.body).not.be.empty
                        expect(resp.body.message).includes('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
                    })
                })
            })
        })
        it('Produto com Nome ja existente', function () {
            cy.fixture("API/produto.json").then((body) => {
                let produtoExistente = cd.getNumerosAleatorios()
                body.post.nome = body.post.nome + produtoExistente
                cy.get('@token', { log: false }).then((refToken) => {


                    cy.request({
                        method: 'POST',
                        body: body.post,
                        failOnStatusCode: false,
                        url: `${Cypress.env('apiUrl')}/produtos`,
                        auth: {
                            'bearer': refToken
                        },
                    }).then(resp => {
                        expect(resp.status).eq(201);
                        expect(resp.body).not.be.empty
                        expect(resp.body.message).includes('Cadastro realizado com sucesso')

                        cy.request({
                            method: 'POST',
                            body: body.post,
                            failOnStatusCode: false,
                            url: `${Cypress.env('apiUrl')}/produtos`,
                            auth: {
                                'bearer': refToken
                            },
                        }).then(resp => {
                            expect(resp.status).eq(400);
                            expect(resp.body).not.be.empty
                            expect(resp.body.message).includes('Já existe produto com esse nome')
                        })
                    })
                })
            })

        })
    })

})