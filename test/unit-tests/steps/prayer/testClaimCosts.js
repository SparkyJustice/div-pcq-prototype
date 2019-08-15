const { expect } = require('test/util/chai');
const { request, testApp } = require('test/util/supertest');
const ClaimCosts = require('app/steps/prayer/claimCosts');

describe('ClaimCosts', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new ClaimCosts().url).to.eql('/claim-costs');
    });
  });

  describe('#transform', () => {
    const claimCosts = new ClaimCosts();

    it('claim costs is no', () => {
      const payload = {};
      const session = {
        ClaimCosts: {
          claim: 'No'
        },
        adultery: { corespondent: {}}
      };

      claimCosts.transform(session, payload);
      expect(payload).to.eql({claimCosts:{statement:'No'}});
    });
    it('claim costs from correspondent only', () => {
      const payload = {};
      const session = {
        ClaimCosts: {
          claim: 'Yes',
          claimFrom: ['corespondent']
        },
        adultery: {
          corespondent: {
            firstName: 'Laura',
            lastName: 'James'
          }
        }
      };

      claimCosts.transform(session, payload);
      expect(payload).to.eql({claimCosts : {
            statement: 'Request that Laura James pays the cost of the divorce proceedings'
        }});
    });
    it('claim costs from husband only', () => {
      const payload = {};
      const session = {
        ClaimCosts: {
          claim: 'Yes',
          claimFrom: ['respondent']
        },
        adultery: { corespondent: {}},
        divorceWho: 'husband'
      };

      claimCosts.transform(session, payload);
      expect(payload).to.eql({claimCosts : {
            statement: 'Request that husband pays the cost of the divorce proceedings'
        }});
    });
    it('claim costs from husband and corespondent', () => {
      const payload = {};
      const session = {
        ClaimCosts: {
          claim: 'Yes',
          claimFrom: ['respondent', 'corespondent']
        },
        adultery: {
          corespondent: {
            firstName: 'Laura',
            lastName: 'James'
          }
        },
        divorceWho: 'husband'
      };

      claimCosts.transform(session, payload);
      expect(payload).to.eql({claimCosts : {
        statement: 'Request that your divorce proceedings are paid for by:',
        who: ['husband', 'Laura James']
        }});
    });
  });
  describe('#router', () => {
    describe('GET endpoint', () => {
      it('renders the claim costs screen', (done) => {
        const step = new ClaimCosts();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Do you want your (husband|wife|former partner|husband\/wife) to pay/)
          .expect(200, done);
      });
    });

    describe('POST endpoint', () => {
      it('redirects to the next step if successful', (done) => {
        const step = new ClaimCosts();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .expect('location', '/pay')
          .expect(302, done);
      });
    });
  });
});
