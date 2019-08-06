const { expect } = require('test/util/chai');
const { request, testApp, withSession } = require('test/util/supertest');
const { stubReq } = require('test/util/validations');
const RespondentDetails = require('app/steps/respondent/details');

const HUSBAND_OR_WIFE = 'former partner';

const fullApplication = {
  currentFirstName: 'John',
  currentLastName: 'Smith',
  dobDay: '29',
  dobMonth: '12',
  dobYear: '1991',
  gender: 'male',
  email: 'john@smith.com',
  phoneNumber: '01234 123 456',
  occupation: 'Dentist'
};

const except = (...keys) => {
  const filteredApp = Object.assign({}, fullApplication);
  keys.forEach(key => {
    filteredApp[key] = undefined;
  });

  return filteredApp;
};

const withValues = (keypairs) => {
  return Object.assign({}, fullApplication, keypairs);
};

describe('RespondentDetails', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new RespondentDetails().url).to.eql('/respondent/details');
    });
  });

  describe('#transform', () => {
    const respondentDetails = new RespondentDetails();

    it('transform first and last name', () => {
      const payload = {};
      const session = {
        RespondentDetails: {
          currentFirstName: 'James',
          currentLastName: 'Brown'
        }
      };

      respondentDetails.transform(session, payload);
      expect(payload).to.eql({respondent: {name: 'James Brown'}});
    });
    it('transform email', () => {
      const payload = {};
      const session = {
        RespondentDetails: {email: 'a@b.com'}
      };

      respondentDetails.transform(session, payload);
      expect(payload).to.eql({respondent: {email: 'a@b.com'}});
    });
    it('transform phoneNumber', () => {
      const payload = {};
      const session = {
        RespondentDetails: {phoneNumber: '012345678'}
      };

      respondentDetails.transform(session, payload);
      expect(payload).to.eql({respondent: {phoneNumber: '012345678'}});
    });
    it('transform occupation', () => {
      const payload = {};
      const session = {
        RespondentDetails: {occupation: 'accountant'}
      };

      respondentDetails.transform(session, payload);
      expect(payload).to.eql({respondent: {occupation: 'accountant'}});
    });
    it('transform gender female', () => {
      const payload = {};
      const session = {
        RespondentDetails: {gender: 'female'}
      };

      respondentDetails.transform(session, payload);
      expect(payload).to.eql({respondent: {gender: 'female'}});
    });
    it('transform gender male', () => {
      const payload = {};
      const session = {
        RespondentDetails: {gender: 'male'}
      };

      respondentDetails.transform(session, payload);
      expect(payload).to.eql({respondent: {gender: 'male'}});
    });
    it('transform gender identify as', () => {
      const payload = {};
      const session = {
        RespondentDetails: {gender: 'other', identifyAs: 'neither'}
      };

      respondentDetails.transform(session, payload);
      expect(payload).to.eql({respondent: {gender: 'neither'}});
    });
  });
  describe('#validate', () => {
    const variations = [
      { test: 'returns no errors for a valid payload',
        body: fullApplication
      },
      { test: 'errors if first name not provided',
        body: except('currentFirstName'),
        expected: [{
          msg: 'Please enter your ' + HUSBAND_OR_WIFE + '\'s first name',
          param: 'currentFirstName',
          value: undefined
        }]
      },
      { test: 'errors if last name not provided',
        body: except('currentLastName'),
        expected: [{
          msg: 'Please enter your ' + HUSBAND_OR_WIFE + '\'s last name',
          param: 'currentLastName',
          value: undefined
        }]
      },
      { test: 'doesn\'t error if email not provided',
        body: except('email')
      },
      { test: 'doesn\'t error if gender not provided',
        body: except('gender')
      },
      { test: 'errors if email not an email',
        body: withValues({email: 'foo'}),
        expected: [{
          msg: 'Please enter a valid email address',
          param: 'email',
          value: 'foo'
        }]
      },
      { test: 'errors if email is similar to an email but not an email',
        body: withValues({email: 'foo@foo'}),
        expected: [{
          msg: 'Please enter a valid email address',
          param: 'email',
          value: 'foo@foo'
        }]
      },
      { test: 'doesn\'t error if phone number not provided',
        body: except('phoneNumber')
      },
      { test: 'if phone number provided errors if not a phone number',
        body: withValues({ phoneNumber: 'blargh' }),
        expected: [{
          msg: 'Please enter a valid phone number',
          param: 'phoneNumber',
          value: 'blargh'
        }]
      },
      { test: 'if phone number provided it must be a phone number',
        body: withValues({ phoneNumber: '01234 123 456' })
      },
      { test: 'if phone number provided it must be a phone number',
        body: withValues({ phoneNumber: '+12 (0) 1234 123 456' })
      },
      { test: 'if phone number provided it must be a phone number',
        body: withValues({ phoneNumber: '+12 1234 123 456' })
      },
      { test: 'if phone number provided it must be a phone number',
        body: withValues({ phoneNumber: '01234123456' })
      },
      { test: 'if phone number provided it must be a phone number',
        body: withValues({ phoneNumber: '+121234123456' })
      },
      { test: 'doesn\'t errors if occupation not provided',
        body: except('occupation')
      },
      { test: 'errors if nothing provided',
        body: {},
        expected: [{
          msg: 'Please answer this question',
          param: 'form',
          value: undefined
        }]
      }
    ];
    const step = new RespondentDetails();

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
      it('renders the respondent details screen', (done) => {
        const step = new RespondentDetails();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Enter your husband\/wife’s details/)
          .expect(200, done);
      });
      it('renders errors if they exist', (done) => {
        const step = new RespondentDetails();
        const app = testApp({ errors: [{
          msg: 'Please answer this question',
          param: 'form',
          value: undefined
        }]});
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Enter your husband\/wife’s details/)
          .expect(/Please answer this question/)
          .expect(200, done);
      });
    });

    describe('POST endpoint', () => {
      it('redirects to the next step if successful', (done) => {
        const step = new RespondentDetails();
        const app = testApp({divorceWho: ''});
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send(fullApplication)
          .expect('location', '/respondent/correspondence-address/postcode')
          .expect(302, done);
      });
      it('redirects back to the step if unsuccessful', (done) => {
        const step = new RespondentDetails();
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
                param: 'form'
              }]);
            });
          });
      });
    });
  });
});
