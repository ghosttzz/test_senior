/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-namespace */
import loc from '../support/locators';
declare global {
    namespace Cypress {
        interface Chainable {
            logandoUsuario(): Chainable<Window>;
            cadastrandoUsuario(admin?: boolean): Chainable<Window>;

        }
    }
}
let numUsuario = null
//Estou criando uma função para cadastrar um usuario via endpoint para ganhar mais tempo e tornar o teste totalmente independente e também logando com o mesmo
Cypress.Commands.add('cadastrandoUsuario', (admin) => {
     numUsuario = getNumerosAleatorios()
    //Aqui estou c
    let bodyEndPoint = {
        "nome": `${numUsuario}UsuarioAutomatico`,
        "email": `${numUsuario}testUsuarioAutomatico@gmail.com`,
        "password": "teste",
        "administrador": `${admin}`
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
//Aqui estamos logando o Usuario Criado
Cypress.Commands.add('logandoUsuario', () => {

    cy.get(loc.telaInicialLogin).should('be.visible')
    cy.get(loc.inputEmail).type(`${numUsuario}testUsuarioAutomatico@gmail.com`)
    cy.get(loc.inputSenha).type('teste')

    cy.intercept('POST', '**/login**').as('postLogandoDepoisDoCadastro');
    cy.get(loc.buttonEntrar).click()

    cy.wait('@postLogandoDepoisDoCadastro').its('response.statusCode').should('eq', 200)

    //Validando redirecionamento de URL. Coloquei APIURL porque tem uma diferença no inicio que seria o front.
    cy.url().should('include', 'home');
    cy.get(loc.telaInicialEcommerce).should('be.visible')
})


function getNumerosAleatorios(): void {
    let numAleatorio = (Math.floor((Math.random() * 99999999) + 1))
    while (numAleatorio > 9999999) {
        numAleatorio = (Math.floor((Math.random() * 99999999) + 1))
    }
    return numAleatorio.toString()
}
export default { getNumerosAleatorios, numUsuario }