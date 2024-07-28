# Automação de Testes com Cypress
Este projeto é referente a alguns cenários de possíveis automações e diferentes formas de faze-las. Foi construido com uma ideia utilizando a aplicação https://front.serverest.dev.
Foram colocados vários comentários nos testes, eles irão auxiliar no entedimento do projeto.

Os cenários de teste em que esses testes foram automatizados, estão no arquivo `analiseTestes.pdf`

### Tecnologias Utilizadas
- Node.js (Versão 12 ou superior)
- Cypress (Versão 12.14 ou superior)
- TypeScript (Última versão)
- JavaScript (Última versão)

## Estrutura do Projeto
    cypress/
    │  ├── fixtures/
    │    │  ├──── API/
    │    │  │   │ └── exemploData.json
    │    │  ├──── Bugs/
    │    │  │   │ └── exemploData.json
    │    │  ├──── e2e/
    │    │  │   │ └── exemploData.json
    │  ├── integration/
    │    │  ├──── API/
    │    │  │   │ └── exemplo.spec.ts
    │    │  ├──── Bugs/
    │    │  │   │ ├──── e2e/
    │    │  │   │       └── exemplo.spec.ts
    │    │  ├──── e2e/
    │    │  │   │ └── exemplo.spec.ts
    │  ├── support/
    │  │   ├── commands.ts
    │  │   └── index.ts
    │  │   └── locators.ts
    │  │   └── plugins.ts
    │  │──tsconfig.json
    ├── cypress.config.ts
    ├── package.json
    └── README.md
- fixtures/: Contém arquivos de dados dos testes, dos mais variados. E nela está em diferentes pastas para deixar mais organizado
- integration/: Contem os arquivos de testes, e segue o mesmo padrão que o fixture, assim facilitando a manutenção
- support/: Contém comandos customizados e configurações e algumas formas de escrever o código diferente, como o próprio locators.
- tsconfig.json: Arquivo de configuração do TypeScript
- cypress.json: Arquivo de configuração do Cypress e com todas as informações necessárias
- package.json: Arquivo do próprio projeto

- Essa estruturação torna mais fácil a manutenção, e juntamente com a escrita utilizando mais Describes como forma de limitar os cenários, torna mais entendivel no CI/CD o que quebrou e o que pode melhorar. 
- Trazendo também o caso do locators, com ele conseguimos limitar os elementos html, e com isso caso algum ID mude, não precisamos ir em cada teste, e sim apenas mudar no arquivo principal.

## Instalação 

1. Instale o Node Js `https://nodejs.org/pt/download/prebuilt-installer`
2. Clone o repositório em uma pasta de sua preferência `git clone https://github.com/ghosttzz/test_senior`
3. Instale as dependências com `npm install`

## Como rodar
Após a instalação, você tem tudo pronto, agora só falta rodar os testes.

Existem 2 Opções mais básicas para rodar os testes

`npx cypress open` - Essa opção abrirá a interface gráfica do Cypress, facilitando na hora de desenvolver, é mais demorado a rodagem mas facilita a manutenção

`npx cypress run` - Essa opção roda diretamente na linha de comando os testes, sendo mais rapido e mais utilizado no CI/CD por exemplo

Porém, existem momentos que você não deseja rodar tudo de uma vez, e sim apenas pasta por pasta, ou um teste em específico

`npx cypress run --browser chrome --spec .\path\integration\API\produtos.spec.ts` - Nessa linha de comando estamos colocando como variavel da rodagem o browser, podendo ser chrome, electron, edge e firefox. 

Para o caso de rodar uma pasta, seria:
`npx cypress run --browser chrome .\cypress\integration\API\`
