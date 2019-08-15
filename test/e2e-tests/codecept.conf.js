exports.config = {
  'tests': './tests/test*.js',
  'timeout': 1000,
  'output': process.env.E2E_OUTPUT_DIR || './output',
  'helpers': {
    'Nightmare': {
      'url': process.env.E2E_TEST_URL || 'http://localhost:3000',
      'show': false
      }
    },
  'include': {
    'I': './steps_file.js',
    'IAmAtMarriageDatePage': './pages/marriageDate.js',
    'IAmAtJurisdiction': './pages/jurisdiction/jurisdiction.js',
    'IAmAtYourConnection': './pages/jurisdiction/yourConnections.js'
    },
  'bootstrap': false,
  'mocha': {
    'reporterOptions': {
      'reportDir': process.env.E2E_OUTPUT_DIR || './output'
      }
    },
    'name': 'End2EndTest'
  };