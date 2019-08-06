const { expect } = require('test/util/chai');
const { request, testApp } = require('test/util/supertest');
const Financials = require('app/steps/prayer/financials');
const session = {
  HelpWithFees: {
    hasAppliedForFees: 'No'
  }
};
describe('Financials', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new Financials().url).to.eql('/financial-arrangements');
    });
  });

  describe('#router', () => {
    describe('GET endpoint', () => {
      it('renders the financial arrangement screen', (done) => {
        const step = new Financials();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Do you want to reserve the right to apply for a financial order?/)
          .expect(200, done);
      });
    });

    describe('POST endpoint', () => {
      it('redirects back if unsuccessful', (done) => {
        const step = new Financials();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .expect('location', '/financial-arrangements')
          .expect(302, done);
      });
      it('redirects to the next financials step if answered yes', (done) => {
        const step = new Financials();
        const app = testApp(session);
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send({ financialOrder: 'Yes' })
          .expect('location', '/financial-arrangements/for-who')
          .expect(302, done);
      });
      it('redirects to the done step if answered no', (done) => {
        const step = new Financials();
        const app = testApp(session);
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send({ financialOrder: 'No' })
          .expect('location', '/pay')
          .expect(302, done);
      });
    });
  });
});
