const { expect, sinon } = require('test/util/chai');
const { request, testApp } = require('test/util/supertest');
const CheckYourAnswers = require('app/steps/checkYourAnswers');
const PetitionerDetails = require('app/steps/about-you/petitionerDetails');
const RespondentDetails = require('app/steps/respondent/details');

describe('CheckYourAnswers', () => {

  describe('#url', () => {
    it('provides a url for app.js to consume', () => {
      expect(new CheckYourAnswers().url).to.eql('/check-your-answers');
    });
  });

  describe('#locals', () => {
      it('payload is empty if there is nothing in the session', () => {
        const context =  {};
        context.session = {
            certificate: {},
            facts: {},
            jurisdiction: {}
        };

        new CheckYourAnswers().locals(context);
        expect(context.checkYourAnswers).to.be.empty;
      });

    it('each step transform function is called once', () => {
      const petitionerDetails = new PetitionerDetails();
      const respondentDetails = new RespondentDetails();

      sinon.spy(petitionerDetails, 'transform');
      sinon.spy(respondentDetails, 'transform');

      const context = {};
      context.session = {
          certificate: {},
          facts: {},
          jurisdiction: {}
      };

      new CheckYourAnswers([petitionerDetails, respondentDetails])
        .locals(context);

      expect(petitionerDetails.transform).to.have.been.calledOnce;
      expect(respondentDetails.transform).to.have.been.calledOnce;
    });
  });

  describe('#router', () => {
    describe('GET endpoint', () => {
      it('renders the check your answers screen', (done) => {
        const step = new CheckYourAnswers();
        const app = testApp({
          certificate: {},
          facts: {},
          jurisdiction: {}
        });
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Check your answers/)
          .expect(200, done);
      });
    });
  });
});
