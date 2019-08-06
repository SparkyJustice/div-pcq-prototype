const { expect } = require('test/util/chai');
const { request, testApp } = require('test/util/supertest');
const { stubReq } = require('test/util/validations');
const CardPayment = require('app/steps/pay/card');

describe('CardPayment', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new CardPayment().url).to.eql('/pay/by-card');
    });
  });
  describe('#validate', () => {
    const step = new CardPayment();
    const test = (body, expected=false) => {
      const req = stubReq({ body });
      step.validate(req);
      const errors = req.validationErrors();

      expect(errors).to.eql(expected);
    };
    const errors = (errors) => {
      return Object.keys(errors).map(key => {
        const msg = errors[key].msg || errors[key];
        const value = errors[key].value || undefined;

        return { msg: msg, param: key, value: value };
      });
    };

    it('no errors with phonenumber and call in the morning', () => {
      test({ phoneNumber: '01234 123 123', timeToCall: 'morning' });
    });
    it('no errors with phonenumber and call in evening', () => {
      test({ phoneNumber: '01234 123 123', timeToCall: 'afternoon' });
    });
    it('errors if question not answered', () => {
      test({}, errors({form: { msg: 'Please answer the question' } }));
    });
    it('errors if phoneNumber not provided', () => {
      test(
        { timeToCall: 'morning' },
        errors({ phoneNumber: { msg: 'Please provide your phone number' } })
      );
    });
    it('errors if phoneNumber not valid', () => {
      test(
        { phoneNumber: 'foo', timeToCall: 'morning' },
        errors({ phoneNumber: {
          msg: 'Please provide your phone number',
          value: 'foo'
        }})
      );
    });
    it('errors if timeToCall not provided', () => {
      test(
        { phoneNumber: '01234 123 123' },
        errors({ timeToCall: 'Please tell us when suits best' })
      );
    });
    it('errors if timeToCall not valid', () => {
      test(
        { phoneNumber: '01234 123 123', timeToCall: 'whenever' },
        errors({ timeToCall: {
          msg: 'Please tell us when suits best',
          value: 'whenever'
        }})
      );
    });
  });

  describe('#router', () => {
    describe('GET endpoint', () => {
      it('renders the page', (done) => {
        const step = new CardPayment();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Paying by debit or credit card/)
          .expect(200, done);
      });
    });

    describe('POST endpoint', () => {
      it('redirects to the next step if successful', (done) => {
        const step = new CardPayment();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send({ phoneNumber: '01234 123 456', timeToCall: 'morning' })
          .expect('location', '/check-your-answers')
          .expect(302, done);
      });
      it('redirects back if not answered', (done) => {
        const step = new CardPayment();
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
