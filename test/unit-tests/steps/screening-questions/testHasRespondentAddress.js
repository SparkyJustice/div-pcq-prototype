const { expect } = require('test/util/chai');
const { request, testApp, withSession } = require('test/util/supertest');
const { stubReq } = require('test/util/validations');
const HasRespondentAddress = require('app/steps/screening-questions/hasRespondentAddress');

const fullApplication = {
  hasRespondentAddress: 'Yes'
};

describe('HasRespondentAddress', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new HasRespondentAddress().url).to.eql('/screening-questions/respondent-address');
    });
  });

  describe('#validate', () => {
    const variations = [
      { test: 'returns no errors for a valid payload',
        body: fullApplication
      },
      { test: 'errors if answer not provided',
        body: {},
        expected: [{
          msg: 'Please answer this question',
          param: 'hasRespondentAddress',
          value: undefined
        }]
      }
    ];
    const step = new HasRespondentAddress();

    variations.forEach(({test, body, expected=false}) => {
      it(test, () => {
        const req = stubReq({ body });
        step.validate(req);
        const errors = req.validationErrors();

        expect(errors).to.eql(expected);
      });
    });
  });

  describe('#router', () => {
    describe('GET endpoint', () => {
      it('renders the "Do you have an address for your" screen', (done) => {
        const step = new HasRespondentAddress();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Do you have an address for your/)
          .expect(200, done);
      });
      it('renders errors if they exist', (done) => {
        const step = new HasRespondentAddress();
        const app = testApp({ errors: [{
          msg: 'Please answer this question',
          param: 'form',
          value: undefined
        }]});
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Do you have an address for your/)
          .expect(/Please answer this question/)
          .expect(200, done);
      });
    });

    describe('POST endpoint', () => {
      it('redirects to the next step if successful', (done) => {
        const step = new HasRespondentAddress();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send(fullApplication)
          .expect('location', '/help-with-fees')
          .expect(302, done);
      });
      it('redirects to the exit screen if "NO" selected', (done) => {
        const step = new HasRespondentAddress();
        const app = testApp();
        step.bind(app);
        fullApplication.hasRespondentAddress='No';

        request(app)
        .post(step.url)
        .type('form')
        .send(fullApplication)
        .expect('location', '/exit/screening-questions/no-respondent-address')
        .expect(302, done);
      });
      it('redirects back to the step if unsuccessful', (done) => {
        const step = new HasRespondentAddress();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send({})
          .expect('location', step.url)
          .expect(302)
          .end(function(err, res) {
            withSession(app, res, done, session => {
              expect(session).to.contain.key('errors');
              expect(session.errors).to.eql([{
                msg: 'Please answer this question',
                param: 'hasRespondentAddress'
              }]);
            });
          });
      });
    });
    describe('#transform', () => {
      it('transforms information about if respondent address exists', () => {
        const payload = {};
        const fakeSession = {
          'hasRespondentAddress': 'Yes'
        };
        new HasRespondentAddress().transform(fakeSession, payload);
        expect(payload).to.eql({'hasRespondentAddress': true});
      });
    });
  });
});
