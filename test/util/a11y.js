const pa11y = require ('pa11y');
const pa11ytest = pa11y ({});

function pa11yRun(testPage, done) {
  pa11ytest.run(testPage, function(error, results) {
    describe('Testing Accessibility for'+ testPage, () => {
      results.forEach(test => {
        if (test.type === 'error') {
          it(test.code, () => {
            throw new Error(JSON.stringify(test, null,2));
          });
        }
      });
      if (results.some(res => res.type === 'error')) {
        throw new Error('Accessibility errors found in ' + testPage);
      } else {
        done();
      }
    });
  });
}

module.exports = {
  pa11yRun
};
