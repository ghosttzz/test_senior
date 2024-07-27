import { defineConfig } from 'cypress'

export default defineConfig({
  env:{
    apiUrl: 'https://serverest.dev/'
  },
  e2e: {
    // e2e options here
    specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/index.ts',
    baseUrl: 'https://front.serverest.dev/'

  },
})