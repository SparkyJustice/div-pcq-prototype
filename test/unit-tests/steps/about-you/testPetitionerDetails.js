const { expect } = require('test/util/chai');
const { request, testApp, withSession } = require('test/util/supertest');
const { stubReq } = require('test/util/validations');
const PetitionerDetails = require('app/steps/about-you/petitionerDetails');

const fullApplication = {
  currentFirstName: 'John',
  currentLastName: 'Smith',
  nameOnCertificate: 'Yes',
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

describe('PetitionerDetails', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new PetitionerDetails().url).to.eql('/about-you/details');
    });
  });

  describe('#transform', () => {
    const petitionerDetails = new PetitionerDetails();

    it('transform first and last name', () => {
      const payload = {};
      const session = {
        PetitionerDetails: {
          currentFirstName: 'James',
          currentLastName: 'Brown'
        }
      };

      petitionerDetails.transform(session, payload);
      expect(payload).to.eql({petitioner: {name: 'James Brown'}});
    });
    it('transform name on marriage certificate', () => {
      const payload = {};
      const session = {
        PetitionerDetails: {
          nameOnCertificate: 'Yes'
        }
      };

      petitionerDetails.transform(session, payload);
      expect(payload).to.eql({
        nameOnCertificate: 'Yes',
        petitioner: {}
      });
    });
    it('transform email', () => {
      const payload = {};
      const session = {
        PetitionerDetails: {email: 'a@b.com'}
      };

      petitionerDetails.transform(session, payload);
      expect(payload).to.eql({petitioner: {email: 'a@b.com'}});
    });
    it('transform phoneNumber', () => {
      const payload = {};
      const session = {
        PetitionerDetails: {phoneNumber: '012345678'}
      };

      petitionerDetails.transform(session, payload);
      expect(payload).to.eql({petitioner: {phoneNumber: '012345678'}});
    });
    it('transform occupation', () => {
      const payload = {};
      const session = {
        PetitionerDetails: {occupation: 'accountant'}
      };

      petitionerDetails.transform(session, payload);
      expect(payload).to.eql({petitioner: {occupation: 'accountant'}});
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
          msg: 'Please enter your first name',
          param: 'currentFirstName',
          value: undefined
        }]
      },
      { test: 'errors if last name not provided',
        body: except('currentLastName'),
        expected: [{
          msg: 'Please enter your last name',
          param: 'currentLastName',
          value: undefined
        }]
      },
      { test: 'errors if name on marriage certificate not provided',
        body: except('nameOnCertificate'),
        expected: [{
          msg: 'Please select whether this is the name shown on your marriage certificate',
          param: 'nameOnCertificate',
          value: undefined
        }]
      },
      { test: 'errors if email not provided',
        body: except('email'),
        expected: [{
          msg: 'Please enter your email',
          param: 'email',
          value: undefined
        }]
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
      { test: 'doesn\'t error if phone number not provided',
        body: except('phoneNumber')
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
    const step = new PetitionerDetails();

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
      it('renders the petitioner details screen', (done) => {
        const step = new PetitionerDetails();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Enter your details/)
          .expect(200, done);
      });
      it('renders errors if they exist', (done) => {
        const step = new PetitionerDetails();
        const app = testApp({ errors: [{
          msg: 'Please answer this question',
          param: 'form',
          value: undefined
        }]});
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Enter your details/)
          .expect(/Please answer this question/)
          .expect(200, done);
      });
 });
    describe('POST endpoint', () => {
      it('redirects to the next step if successful', (done) => {
        const step = new PetitionerDetails();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send(fullApplication)
          .expect('location', '/about-you/address/postcode')
          .expect(302, done);
      });
      it('redirects back to the step if unsuccessful', (done) => {
        const step = new PetitionerDetails();
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
