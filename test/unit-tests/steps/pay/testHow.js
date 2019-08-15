const { expect } = require('test/util/chai');
const { request, testApp } = require('test/util/supertest');
const HowToPay = require('app/steps/pay/how');

describe('HowToPay', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new HowToPay().url).to.eql('/pay');
    });
  });

  describe('#router', () => {
    describe('GET endpoint', () => {
      it('renders the page', (done) => {
        const step = new HowToPay();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/How do you want to pay?/)
          .expect(200, done);
      });
    });

    describe('POST endpoint', () => {
      it('redirects to the next step if successful', (done) => {
        const step = new HowToPay();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send({ method: 'by-cheque' })
          .expect('location', '/check-your-answers')
          .expect(302, done);
      });
      it('redirects to the card payment step if by-card', (done) => {
        const step = new HowToPay();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send({ method: 'by-card' })
          .expect('location', '/pay/by-card')
          .expect(302, done);
      });
      it('redirects back if not answered', (done) => {
        const step = new HowToPay();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .expect('location', step.url)
          .expect(302, done);
      });
    });
  });
});
