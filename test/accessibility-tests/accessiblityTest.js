const { request, testApp } = require('test/util/supertest');
const PetitionerDetails = require('app/steps/about-you/petitionerDetails');
const {pa11yRun} = require ('test/util/a11y');

var accessibilityPages = [
  PetitionerDetails
];

accessibilityPages.forEach(function(view) {
  describe('Running Accessibility tests ', () => {
    it('Verify accessibility for the page ' + view.name , (done) => {
      const step = new view();
      const app = testApp();
      step.bind(app);

      request(app)
      .get(step.url);
      pa11yRun(request(app).get(step.url).url, done);
    });
  });
});
