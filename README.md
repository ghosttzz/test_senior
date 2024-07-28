# Automação de Testes com Cypress
Este projeto é referente a alguns cenários de possíveis automações e diferentes formas de faze-las. Foi construido com uma ideia utilizando a aplicação https://front.serverest.dev

### Tecnologias Utilizadas
- Node.js (Versão 12 ou superior)
- Cypress (Versão 12.14 ou superior)

## Instalação 

1. Instale o Node Js `https://nodejs.org/pt/download/prebuilt-installer`
2. Clone o repositório em uma pasta de sua preferência `git clone https://github.com/ghosttzz/test_senior`
3. Instale as dependências com `npm install`

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
    ├── cypress.config.ts
    ├── package.json
    └── README.md
- fixtures/: Contém arquivos de dados dos testes, dos mais variados. E nela está em diferentes pastas para deixar mais organizado
- integration/: Contem os arquivos de testes, e segue o mesmo padrão que o fixture, assim facilitando a manutenção
- support/: Contém comandos customizados e configurações e algumas formas de escrever o código diferente, como o próprio locators.
- tsconfig.json: Arquivo de configuração do TypeScript
- cypress.json: Arquivo de configuração do Cypress e com todas as informações necessárias
- package.json: Arquivo do próprio projeto