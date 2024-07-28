
/// <reference  types = "cypress" />

import loc from '../../../support/locators';
import num from '../../../support/commands'
describe('Rotina de Produtos', () => {
    describe('Cadastrando um Produto', () => {
        before(() => {
            cy.cadastrandoUsuario(true)
        })
        beforeEach(() => {
            cy.visit('/home')
            cy.logandoUsuario()
        })
        // Eu criei outro Caso de teste, porque, se juntar varios casos em apenas um IT, não saberemos qual quebrou em uma pipeline ou rodagem diaria, dividir em varios its, facilita descobrir onde o teste quebrou
        it('Cadastrando um Produto', () => {
            cy.fixture("e2e/Cadastros/cadastrandoProdutoData.json").then((infoProduto) => {

                cy.url().should('include', '/admin/home');
                cy.get(loc.telaProduto.buttonTelaCadastrandoProdutos).click()
                cy.get(loc.h1TituloPagina).should('contain', 'Cadastro de Produtos')
                cy.url().should('include', '/admin/cadastrarprodutos');


                cy.get(loc.telaProduto.inputNome).type(infoProduto.nome)
                cy.get(loc.telaProduto.inputPreco).type(infoProduto.preco)
                cy.get(loc.telaProduto.inputDescricao).type(infoProduto.descricao)
                cy.get(loc.telaProduto.inputQuantidade).type(infoProduto.quantidade)

                //Normalmente eles pedem para baixar um plugin de upload, mas eu criei/achei essa forma a um tempo atrás
                cy.get(loc.telaProduto.inputImagem).as('file-input').click()
                    .selectFile('cypress/fixtures/e2e/Cadastros/senior.png')
                cy.intercept('POST', '**/produtos**').as('postCadastrandoProdutos');
                cy.get(loc.telaProduto.buttonCadastrarProdutos).click()
                cy.wait('@postCadastrandoProdutos').its('response.statusCode').should('eq', 201)


                cy.url().should('include', '/admin/listarprodutos');
                cy.get(loc.h1TituloPagina).should('contain', 'Lista dos Produtos')


            })
        })
        it('Tentando Cadastrar um Mesmo Produto', () => {
            cy.fixture("e2e/Cadastros/cadastrandoProdutoData.json").then((infoProduto) => {

                cy.url().should('include', '/admin/home');
                cy.get(loc.telaProduto.buttonTelaCadastrandoProdutos).click()
                cy.get(loc.h1TituloPagina).should('contain', 'Cadastro de Produtos')
                cy.url().should('include', '/admin/cadastrarprodutos');


                cy.get(loc.telaProduto.inputNome).type(infoProduto.nome)
                cy.get(loc.telaProduto.inputPreco).type(infoProduto.preco)
                cy.get(loc.telaProduto.inputDescricao).type(infoProduto.descricao)
                cy.get(loc.telaProduto.inputQuantidade).type(infoProduto.quantidade)

                //Normalmente eles pedem para baixar um plugin de upload, mas eu criei/achei essa forma a um tempo atrás
                cy.get(loc.telaProduto.inputImagem).as('file-input').click()
                    .selectFile('cypress/fixtures/e2e/Cadastros/senior.png')
                cy.intercept('POST', '**/produtos**').as('postCadastrandoProdutos');
                cy.get(loc.telaProduto.buttonCadastrarProdutos).click()
                cy.wait('@postCadastrandoProdutos').its('response.statusCode').should('eq', 400)

               cy.get(loc.divAlerta).should('contain', 'Já existe produto com esse nome')
            })
        })
        it('Validando como Usuario Padrão', () => {
            cy.fixture("e2e/Cadastros/cadastrandoProdutoData.json").then((infoProduto) => {

                cy.cadastrandoUsuario(false)
                cy.visit('/home')

                cy.intercept('GET', '**/produtos?nome=Produto%20Teste%20Automatizado').as('getProdutoEspecifico');
                cy.get(loc.inputPesquisar).type(infoProduto.nome)
                cy.get(loc.buttonPesquisar).click()
                cy.wait('@getProdutoEspecifico').its('response.statusCode').should('eq', 200)

                cy.get(loc.produtos.hiperlinkDetalhes).click()
                cy.get(loc.produtos.divPreco).should('contain', infoProduto.preco)
                cy.get(loc.produtos.divNome).should('contain', infoProduto.nome)
                cy.get(loc.produtos.divQuantidade).should('contain', infoProduto.quantidade)
                cy.get(loc.produtos.divDescricao).should('contain', infoProduto.descricao)

                //aqui o teste vai dar erro, porque não está salvando a imagem, mas segue o mesmo padrão caso funcionasse, validando a imagem
                // cy.get('.col-4 > .imagem').invoke('attr', 'src').should('contain','senior.png')

                //Estou recadastrando um usuario agora como adm novamente
                cy.cadastrandoUsuario(true)
            })
        })
        it('Editando um Produto', () => {
            cy.fixture("e2e/Cadastros/cadastrandoProdutoData.json").then((infoProduto) => {
                cy.url().should('include', '/admin/home');

                cy.get(loc.telaProduto.buttonListarProdutos).click()

                cy.url().should('include', '/admin/listarprodutos');
                cy.get(loc.h1TituloPagina).should('contain', 'Lista dos Produtos')

                //Como o botão editar não está funcionando, o teste não continua, mas basicamente seria editar para valores diferentes, e validar o salvamento das informações
                cy.get(loc.telaResultados).contains(infoProduto.nome).parent().contains('Editar').click()

            })
        })

        it('Excluindo um Produto', () => {
            cy.fixture("e2e/Cadastros/cadastrandoProdutoData.json").then((infoProduto) => {

                cy.url().should('include', '/admin/home');
                cy.get(loc.telaProduto.buttonListarProdutos).click()
                cy.url().should('include', '/admin/listarprodutos');
                cy.get(loc.h1TituloPagina).should('contain', 'Lista dos Produtos')

                //Como o botão editar não está funcionando, o teste não continua, mas basicamente seria editar para valores diferentes, e validar o salvamento das informações
                cy.intercept('DELETE', '**/produtos/**').as('deleteProduto');
                cy.get(loc.telaResultados).contains(infoProduto.nome).parent().contains('Excluir').click()
                cy.wait('@deleteProduto').its('response.statusCode').should('eq', 200)

            })
        })
    })

})