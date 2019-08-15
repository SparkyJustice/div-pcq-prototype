const { expect } = require('test/util/chai');
const { request, testApp } = require('test/util/supertest');
const FinancialsForWho = require('app/steps/prayer/financialsForWho');
const session = {
  HelpWithFees: {
    hasAppliedForFees: 'No'
  }
};

describe('FinancialsForWho', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new FinancialsForWho().url)
        .to.eql('/financial-arrangements/for-who');
    });
  });
  describe('#transform', () => {
    const financialsForWho = new FinancialsForWho();

    it('financial order is no', () => {
      const payload = {};
      const session = {
        Financials: {
        }
      };

      financialsForWho.transform(session, payload);
      expect(payload).to.eql({financials:{
        statement:'You do not reserve the right to apply for a financial order'
      }});
    });
    it('financial order petitioner only', () => {
      const payload = {};
      const session = {
        FinancialsForWho: {
          claimFrom: ['petitioner']
        }
      };

      financialsForWho.transform(session, payload);
      expect(payload).to.eql({financials:{
        statement:'You reserve the right to apply for a financial order in the future'
      }});
    });
    it('financial order for children only', () => {
      const payload = {};
      const session = {
        FinancialsForWho: {
          claimFrom: ['children']
      }};

      financialsForWho.transform(session, payload);
      expect(payload).to.eql({financials : {
            statement: 'You reserve the right to apply for a financial order for the children'
        }});
    });
    it('financial order for petitioner and children', () => {
      const payload = {};
      const session = {
        FinancialsForWho: {
          claimFrom: ['petitioner', 'children']
      }};

      financialsForWho.transform(session, payload);
      expect(payload).to.eql({financials : {
        statement: 'You reserve the right to apply for a financial order for:',
        who: ['yourself', 'the children']
        }});
    });
  });
  describe('#router', () => {
    describe('GET endpoint', () => {
      it('renders the page', (done) => {
        const step = new FinancialsForWho();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Who would the financial order be for?/)
          .expect(200, done);
      });
    });

    describe('POST endpoint', () => {
      it('redirects to the next step if successful', (done) => {
        const step = new FinancialsForWho();
        const app = testApp(session);
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .expect('location', '/claim-costs')
          .expect(302, done);
      });
    });
  });
});
