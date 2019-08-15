const { expect } = require('test/util/chai');
const { request, testApp, withSession } = require('test/util/supertest');
const { stubReq } = require('test/util/validations');
const HasMarriageCertificate = require('app/steps/screening-questions/hasMarriageCert');

const fullApplication = {
  hasMarriageCert: 'Yes'
};

describe('HasMarriageCertificate', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new HasMarriageCertificate().url).to.eql('/screening-questions/has-marriage-cert');
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
          param: 'hasMarriageCert',
          value: undefined
        }]
      }
    ];
    const step = new HasMarriageCertificate();

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
      it('renders the "Do you have marriage certificate?" screen', (done) => {
        const step = new HasMarriageCertificate();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Do you have your marriage certificate/)
          .expect(200, done);
      });
      it('renders errors if they exist', (done) => {
        const step = new HasMarriageCertificate();
        const app = testApp({ errors: [{
          msg: 'Please answer this question',
          param: 'form',
          value: undefined
        }]});
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Do you have your marriage certificate/)
          .expect(/Please answer this question/)
          .expect(200, done);
      });
    });

    describe('POST endpoint', () => {
      it('redirects to the next step if successful', (done) => {
        const step = new HasMarriageCertificate();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send(fullApplication)
          .expect('location', 'respondent-address')
          .expect(302, done);
      });
      it('redirects to the exit screen if "NO" selected', (done) => {
        const step = new HasMarriageCertificate();
        const app = testApp();
        step.bind(app);
        fullApplication.hasMarriageCert='No';

        request(app)
        .post(step.url)
        .type('form')
        .send(fullApplication)
        .expect('location', '/exit/screening-questions/no-certificate')
        .expect(302, done);
      });
      it('redirects back to the step if unsuccessful', (done) => {
        const step = new HasMarriageCertificate();
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
                param: 'hasMarriageCert'
              }]);
            });
          });
      });
    });
    describe('#transform', () => {
      it('tranforms information about if marriage certificate exists', () => {
        const payload = {};
        const fakeSession = {
          'certificate': {
            'hasMarriageCert': 'Yes'
          }
        };
        new HasMarriageCertificate().transform(fakeSession, payload);
        expect(payload).to.eql({'hasMarriageCert': true});
      });
    });
  });
});
