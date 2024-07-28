
/// <reference  types = "cypress" />

import loc from '../../../support/locators';
import num from '../../../support/commands'
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
            cy.fixture("e2e/Bugs/bugCadastrandoProdutoData.json").then((msgErros) => {
                cy.url().should('include', '/admin/home');

                cy.get('[data-testid="cadastrarProdutos"]').click()

                cy.get('h1').should('contain', 'Cadastro de Produtos')
                cy.url().should('include', '/admin/cadastrarprodutos');


                //Normalmente eles pedem para baixar um plugin de upload, mas eu criei/achei essa forma a um tempo atrás

                cy.intercept('POST', '**/produtos**').as('postCadastrandoProdutos');
                cy.get('[data-testid="cadastarProdutos"]').click()
                cy.wait('@postCadastrandoProdutos').its('response.statusCode').should('eq', 400)

                cy.get('.jumbotron > form > :nth-child(1)').should('contain', msgErros.msgNome)
                //Aqui coloquei, mesmo processo, como não ta funcionando a funcionalidade o teste vai quebrar, mas aqui um exemplo
                //cy.get('form > :nth-child(2)').should('contain', msgErros.msgPreco)

                //Aqui coloquei, mesmo processo, como não ta funcionando a funcionalidade o teste vai quebrar, mas aqui um exemplo
                //cy.get('form > :nth-child(3)').should('contain', msgErros.msgDescricao)
                cy.get('form > :nth-child(4)').should('contain', msgErros.msgQuantidade)

            })
        })
    })
    describe('Campos Obrigatorios', () => {
        it('Validando Campo Obrigatorio - Imagem', () => {
            cy.fixture("e2e/cadastrandoProdutoData.json").then((infoProduto) => {
                cy.url().should('include', '/admin/home');

                cy.get('[data-testid="cadastrarProdutos"]').click()

                cy.get('h1').should('contain', 'Cadastro de Produtos')
                cy.url().should('include', '/admin/cadastrarprodutos');


                cy.get('[data-testid="nome"]').type(infoProduto.nome)

                cy.get('[data-testid="preco"]').type(infoProduto.preco)

                cy.get('[data-testid="descricao"]').type(infoProduto.descricao)

                cy.get('[data-testid="quantity"]').type(infoProduto.quantidade)

                //Estou deixando sem a imagem, e deveria retornar o erro. Mas não está, então comentei essa parte de cadastrar para não ficar cadastrando cadastro atoa. Quando for resolvido é só descomentar 

                // cy.intercept('POST', '**/produtos**').as('postCadastrandoProdutos');
                // cy.get('[data-testid="cadastarProdutos"]').click()
                // cy.wait('@postCadastrandoProdutos').its('response.statusCode').should('eq', 400)

                // cy.url().should('include', '/admin/listarprodutos');
                // cy.get('h1').should('contain', 'Lista dos Produtos')



            })
        })
    })

})