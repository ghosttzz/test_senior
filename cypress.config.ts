import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  downloadsFolder: 'downloads',
  videosFolder: 'videos',
 
  screenshotsFolder: 'screenshots',
  pageLoadTimeout: 30000,
  responseTimeout: 30000,
  requestTimeout: 30000,
  videoCompression: 0,
  "reporter": "cypress-multi-reporters",
  "reporterOptions": {
    "testsuitesTitle": true,
    "suiteTitleSeparatedBy": '.',
    "reporterEnabled": "cypress-mochawesome-reporter, mocha-junit-reporter",
    "cypressMochawesomeReporterReporterOptions": {
      "reportDir": "cypress/reports",
      "charts": true,
      "reportPageTitle": "My Test Suite",
      "embeddedScreenshots": true,
      "inlineAssets": true
    },
    "mochaJunitReporterReporterOptions": {
      "testsuitesTitle": true,
      "mochaFile": 'cypress/reports/junit/[suiteFilename]-[hash].xml'
    
    }
  },
  env: {
    apiUrl: 'https://serverest.dev'
  },
  e2e: {
    // e2e options here
    specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/index.ts',
    baseUrl: 'https://front.serverest.dev',
    viewportWidth: 1280,
    viewportHeight: 720,


  },
})