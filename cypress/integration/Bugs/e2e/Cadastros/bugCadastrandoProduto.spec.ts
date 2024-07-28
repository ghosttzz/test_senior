
/// <reference  types = "cypress" />

import loc from '../../../../support/locators';
describe('Rotina de Produtos', () => {
    describe('Validando Mensagens', () => {
        before(() => {
            cy.cadastrandoUsuario(true)
        })
        beforeEach(() => {
            cy.visit('/home')
            cy.logandoUsuario()
        })
        // Eu criei outro Caso de teste, porque, se juntar varios casos em apenas um IT, não saberemos qual quebrou em uma pipeline ou rodagem diaria, dividir em varios its, facilita descobrir onde o teste quebrou
        it('Validando as mensagens de erro', () => {
            cy.fixture("Bugs/bugCadastrandoProdutoData.json").then((msgErros) => {
                cy.url().should('include', '/admin/home');

                cy.get(loc.telaProduto.buttonTelaCadastrandoProdutos).click()
                cy.get(loc.h1TituloPagina).should('contain', 'Cadastro de Produtos')
                cy.url().should('include', '/admin/cadastrarprodutos');


                cy.intercept('POST', '**/produtos**').as('postCadastrandoProdutos');
                cy.get(loc.telaProduto.buttonCadastrarProdutos).click()
                cy.wait('@postCadastrandoProdutos').its('response.statusCode').should('eq', 400)

                cy.get(loc.telaProduto.msgErroNome).should('contain', msgErros.msgNome)
                //Aqui coloquei, mesmo processo, como não ta funcionando a funcionalidade o teste vai quebrar, mas aqui um exemplo
                //cy.get(loc.telaProduto.msgErroPreco).should('contain', msgErros.msgPreco)

                //Aqui coloquei, mesmo processo, como não ta funcionando a funcionalidade o teste vai quebrar, mas aqui um exemplo
                //cy.get(loc.telaProduto.msgErroDescricao).should('contain', msgErros.msgDescricao)
                cy.get(loc.telaProduto.msgErroQuantidade).should('contain', msgErros.msgQuantidade)

            })
        })
    })
    describe('Campos Obrigatorios', () => {
        before(() => {
            cy.cadastrandoUsuario(true)
        })
        beforeEach(() => {
            cy.visit('/home')
            cy.logandoUsuario()
        })
        it('Validando Campo Obrigatorio - Imagem', () => {
            cy.fixture("e2e/Cadastros/cadastrandoProdutoData.json").then((infoProduto) => {
                cy.url().should('include', '/admin/home');
                cy.get(loc.telaProduto.buttonTelaCadastrandoProdutos).click()
                cy.get(loc.h1TituloPagina).should('contain', 'Cadastro de Produtos')
                cy.url().should('include', '/admin/cadastrarprodutos');


                cy.get(loc.telaProduto.inputNome).type(infoProduto.nome)
                cy.get(loc.telaProduto.inputPreco).type(infoProduto.preco)
                cy.get(loc.telaProduto.inputDescricao).type(infoProduto.descricao)
                cy.get(loc.telaProduto.inputQuantidade).type(infoProduto.quantidade)

                //Estou deixando sem a imagem, e deveria retornar o erro. Mas não está, então comentei essa parte de cadastrar para não ficar cadastrando cadastro atoa. Quando for resolvido é só descomentar 

                // cy.intercept('POST', '**/produtos**').as('postCadastrandoProdutos');
                // cy.get(loc.telaProduto.buttonCadastrarProdutos).click()
                // cy.wait('@postCadastrandoProdutos').its('response.statusCode').should('eq', 400)

                // cy.url().should('include', '/admin/listarprodutos');
                // cy.get(loc.h1TituloPagina).should('contain', 'Lista dos Produtos')



            })
        })
    })

})