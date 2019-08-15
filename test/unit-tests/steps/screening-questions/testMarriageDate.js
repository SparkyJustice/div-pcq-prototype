const { expect } = require('test/util/chai');
const { request, testApp, withSession } = require('test/util/supertest');
const moment = require('moment');

const MarriageDate = require('app/steps/screening-questions/marriageDate');

const marriageDate = {
  day: '29',
  month: '12',
  year: '1991'
};

describe('MarriageDate', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new MarriageDate().url)
        .to.eql('/screening-questions/marriage-date');
    });
  });

  describe('#locals', () => {
    describe('#marriageDateError', () => {
      it('returns false if fields empty', () => {
        const context = { fields: {} };
        new MarriageDate().locals(context);
        expect(context.marriageDateError()).to.be.false;
      });
      it('returns false if fields undefined', () => {
        const context = {};
        new MarriageDate().locals(context);
        expect(context.marriageDateError()).to.be.false;
      });
      it('returns false if all are false', () => {
        const context = {
          fields: {
            marriageDate: { error: false },
            day: { error: false },
            month: { error: false },
            year: { error: false }
          }
        };
        new MarriageDate().locals(context);
        expect(context.marriageDateError()).to.be.false;
      });
      it('returns true if marriageDate.error == true', () => {
        const context = {
          fields: {
            marriageDate: { error: true },
            day: { error: false },
            month: { error: false },
            year: { error: false }
          }
        };
        new MarriageDate().locals(context);
        expect(context.marriageDateError()).to.be.true;
      });
      it('returns true if day.error == true', () => {
        const context = {
          fields: {
            marriageDate: { error: false },
            day: { error: true },
            month: { error: false },
            year: { error: false }
          }
        };
        new MarriageDate().locals(context);
        expect(context.marriageDateError()).to.be.true;
      });
      it('returns true if month.error == true', () => {
        const context = {
          fields: {
            marriageDate: { error: false },
            day: { error: false },
            month: { error: true },
            year: { error: false }
          }
        };
        new MarriageDate().locals(context);
        expect(context.marriageDateError()).to.be.true;
      });
      it('returns true if year.error == true', () => {
        const context = {
          fields: {
            marriageDate: { error: false },
            day: { error: false },
            month: { error: false },
            year: { error: true }
          }
        };
        new MarriageDate().locals(context);
        expect(context.marriageDateError()).to.be.true;
      });
    });
  });

  describe('#router', () => {
    it('binds GET and POST endpoints', () => {
      const step = new MarriageDate();
      const routes = step.router.stack
        .filter(layer => layer.route)
        .map(layer => layer.route);

      const get = routes.filter(route => route.methods.get);
      expect(get).to.have.length(1);

      const post = routes.filter(route => route.methods.post);
      expect(post).to.have.length(1);

      expect(routes.every(route => route.path === '/')).to.be.true;
    });

    describe('GET endpoint', () => {
      it('renders the marriage date screen', (done) => {
        const step = new MarriageDate();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/When did you get married?/)
          .expect(200, done);
      });
      it('renders errors if they exist', (done) => {
        const step = new MarriageDate();
        const app = testApp({ errors: [{
          msg: 'Please answer this question',
          param: 'form',
          value: undefined
        }]});
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/When did you get married?/)
          .expect(/Please answer this question/)
          .expect(200, done);
      });
    });

    describe('POST endpoint', () => {
      it('redirects to the next step if successful', (done) => {
        const step = new MarriageDate();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send(marriageDate)
          .expect('location', 'has-marriage-cert')
          .expect(302, done);
      });
      it('redirects to exit screen if date < 1 year ago', (done) => {
        const step = new MarriageDate();
        const app = testApp();
        step.bind(app);

        const todaysDate = {
          day: moment().date().toString(),
          month: moment().month().toString(),
          year: moment().year().toString()
        };

        request(app)
          .post(step.url)
          .type('form')
          .send(todaysDate)
          .expect('location', '../exit/screening-questions/marriage-date')
          .expect(302, done);
      });
      it('redirects back to the step if unsuccessful', (done) => {
        const step = new MarriageDate();
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
              expect(session.tempAnswers).to.eql({ marriageDate: {
                errorMessage: 'Please answer this question'
              }});
            });
          });
      });
    });
  });
  describe('#transform', () => {
    it('tranforms date into format DD/MM/YY', () => {
      const payload = {};
      const fakeSession = {
        'MarriageDate': {
          day: '01',
          month: '01',
          year: '1970'
        }
      };
      new MarriageDate().transform(fakeSession, payload);
      expect(payload).to.eql({'marriedOn': '1st January 1970'});
    });
  });
});
