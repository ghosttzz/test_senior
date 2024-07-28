const locators = {
    telaInicialEcommerce: '.jumbotron',
    telaInicialLogin: '.App',
    inputEmail: '[data-testid="email"]',
    inputSenha: '[data-testid="senha"]',
    buttonCadastrar: '[data-testid="cadastrar"]',
    buttonEntrar: '[data-testid="entrar"]',
    divAlerta: '.alert',
    h1TituloPagina: 'h1',
    telaResultados: '.jumbotron',
    telaCadastraSe: {
        telaInicialCadastro: '.font-robot',
        inputNome: '[data-testid="nome"]',
        inputPassword: '[data-testid="password"]',
        checkboxCadastroADM: '[data-testid="checkbox"]',
        divAlerta: '.alert',
    },
    telaProduto:{
        buttonTelaCadastrandoProdutos: '[data-testid="cadastrarProdutos"]',
        inputNome: '[data-testid="nome"]',
        inputPreco: '[data-testid="preco"]',
        inputDescricao: '[data-testid="descricao"]',
        inputQuantidade: '[data-testid="quantity"]',
        inputImagem: '[data-testid="imagem"]',
        buttonCadastrarProdutos: '[data-testid="cadastarProdutos"]',
        buttonListarProdutos: '[data-testid="listarProdutos"]',

        msgErroNome: '.jumbotron > form > :nth-child(1)',
        msgErroPreco: 'form > :nth-child(2)',
        msgErroDescricao: 'form > :nth-child(3)',
        msgErroQuantidade:'form > :nth-child(4)' 
    },
    produtos:{
        hiperlinkDetalhes: '.card-link',
        divPreco: '.especificacoes > :nth-child(2)',
        divNome: '[data-testid="product-detail-name"]',
        divQuantidade: '.especificacoes > :nth-child(3)',
        divDescricao: '.especificacoes > :nth-child(4)'
    },
    telaUsuario:{
        buttonTelaCadastrarUsuario: '[data-testid="cadastrarUsuarios"]',
        buttonCadastrandoUsuario: '[data-testid="cadastrarUsuario"]',
        inputEmail: '[data-testid="email"]',
        inputNome: '[data-testid="nome"]',
        inputPassword: '[data-testid="password"]',
        checkboxCadastroADM: '[data-testid="checkbox"]',
        buttonListarUsuario: '[data-testid="listarUsuarios"]'
    },
    rotinaListaCompras:{
        buttonTelaListaCompras: '[data-testid="lista-de-compras"]',
        msgCarrinho: '[data-testid="shopping-cart-empty-message"]',
        divNomeProduct: '[data-testid="shopping-cart-product-name"]',
        divNomeQuantidade: '[data-testid="shopping-cart-product-quantity"] > p',
        buttonLimparLista:'[data-testid="limparLista"]', 
        cardProduto: '.card',
        divPreco: '.card-body > :nth-child(2) > :nth-child(1)',
        buttonAdicionarLista: '[data-testid="adicionarNaLista"]',
        buttonAumentarQuantidade: '[data-testid="product-increase-quantity"]'
    },
    inputPesquisar:'[data-testid="pesquisar"]',
    buttonPesquisar:  '[data-testid="botaoPesquisar"]',
    buttonLogout: '[data-testid="logout"]',
    buttonPaginaInicial: '[data-testid="paginaInicial"]'

}

export default locators;