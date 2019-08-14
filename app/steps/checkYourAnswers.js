const _ = require('underscore');
const Step = require('./app/steps/Step');
const relation = require('app/utils/DivorceRelation');

module.exports = class CheckYourAnswers extends Step {

  constructor(steps = []) {
    super();
    this._steps = steps;
  }

  get url() {
    return '/check-your-answers';
  }

  get template() {
    return 'check-your-answers';
  }

  locals(context) {
    context.session.checkYourAnswersMode = "Yes";

    const payload = {};
    this._steps.forEach((step) => {
      step.transform(context.session, payload);
    });

    // When a user attempts to change something in the form,
    // the following variable can be checked to see if the user should be returned
    // to the check your answers screen afterwards.
    context.session.formCompleted === 1;

    //TODO: Move application type to step
    if (context.session.marriageType) {
      payload.applicationType =
        context.session.marriageType === 'same-sex-marriage' ?
          'Same sex divorce' : 'Divorce';
    }

    //TODO: Move marriage certificate details to step
    const certificateDetails = {};
    const placeOfMarriage = context.session.certificate.placeOfMarriage;

    if (placeOfMarriage && 'church' in placeOfMarriage && 'of1' in placeOfMarriage &&
      'inThe1' in placeOfMarriage && 'of2' in placeOfMarriage &&
      'inThe2' in placeOfMarriage) {

      certificateDetails.line1 = `Marriage solemnised at ${placeOfMarriage.inThe1}`;

      if (placeOfMarriage.church === 'Yes') {
        certificateDetails.line2 = `In the Parish of ${placeOfMarriage.of1}`;
      } else {
        certificateDetails.line2 = `In the District of ${placeOfMarriage.of1}`;
      }
      certificateDetails.line3 = `In the ${placeOfMarriage.inThe2} of ${placeOfMarriage.of2}`;

      payload.certificateDetails = certificateDetails;
    }

    //TODO: Move reason for divorce to step
    const reasonForDivorce = context.session.facts.reason;

    const facts = {};

    switch (reasonForDivorce) {
      case 'unreasonable-behaviour':
        facts.reason = 'Unreasonable behaviour';
        facts.legal = 'The Respondent has behaved in such a way that the ' +
          'Petitioner cannot reasonably be expected to live with the ' +
          'Respondent';
        break;
      case 'adultery':
        facts.reason = 'Adultery';
        facts.legal = 'The Respondent has committed adultery and the ' +
          'Petitioner finds it intolerable to live with the Respondent ' +
          '(only conduct between the respondent and a person of the ' +
          'opposite sex may constitute adultery for this purpose)';
        break;
      case 'separation-2-years':
        facts.reason = '2 years separated';
        facts.legal = 'The parties to the marriage have lived apart for a ' +
          'continuous period of at least two years immediately preceding ' +
          'the presentation of the petition and the Respondent consents to ' +
          'a decree/ order being granted';
        break;
      case 'separation-5-years':
        facts.reason = '5 years separated';
        facts.legal = 'The parties to the marriage have lived apart for a ' +
          'continuous period of at least five years immediately preceding ' +
          'the presentation of the petition.';
        break;
      case 'desertion':
        facts.reason = 'Desertion';
        facts.legal = 'The Respondent has deserted the Petitioner for a ' +
          'continuous period of at least two years immediately preceding ' +
          'the presentation of this petition';
        break;
      default:
    }

    if (!_.isEmpty(facts)) {
      payload.facts = facts;
    }

    context.checkYourAnswers = payload;

    //TODO: move the following to jurisdiction to steps

    const jargon = {
      A: 'The Petitioner and the Respondent are habitually resident in England and Wales',
      C: 'The Respondent is habitually resident in England and Wales.',
      D: 'The Petitioner is habitually resident in England and Wales and has resided there for at least a year ' +
      'immediately prior to the presentation of the petition.',
      E: 'The Petitioner is domiciled and habitually resident in England and Wales and has resided there for at least ' +
      'six months immediately prior to the petition.',
      F: 'The Petitioner and Respondent are both domiciled in England and Wales.'
    };
    const petitionerConnection = context.session.jurisdiction.petitionerConnection;
    const respondentConnection = context.session.jurisdiction.respondentConnection;
    const residedEntireLive = context.session.jurisdiction.livingQuestion;
    const residence = (context.session.jurisdiction.last12Months === 'Yes' ) ? 'yearAtLeast' :
      (context.session.jurisdiction.last6Months === 'Yes') ? 'halfYear' : 'less';

    const who = relation.divorceWho(context.session);

    const CONNECTIONS =
    {
      petitioner: {
        HR: {
          respondent: {
            HR: {
              plain: `You and your ${who} are both habitually resident in England or Wales.`,
              legal: [jargon.A, jargon.C, ...(residence === 'yearAtLeast') ? [jargon.D] : []]
            },
            HRD: {
              plain: 'You are habitually resident in England or Wales. \n ' +
              `Your ${who} is habitually resident and domiciled in England or Wales.`,
              legal: [jargon.A, jargon.C, ...(residence === 'yearAtLeast') ? [jargon.D] : []]
            }
          }
        },
        HRD: {
          respondent: {
            HR: {
              plain: 'You are habitually resident and domiciled in England or Wales. \n' +
              `Your ${who} is habitually resident in England or Wales.`,
              legal: [jargon.A, jargon.C, ...(residence === 'yearAtLeast') ? [jargon.D, jargon.E] :
                (residence === 'halfYear') ? [jargon.E] : []]
            },
            HRD: {
              plain: `You and your ${who} are habitually resident and domiciled in England or Wales.`,
              legal: [jargon.A, jargon.C, ...(residence === 'yearAtLeast') ? [jargon.D, jargon.E, jargon.F] :
                (residence === 'halfYear') ? [jargon.E, jargon.F] : [jargon.F]]
            }
          }
        }
      }
    };

    let connection;

    if (residedEntireLive === 'Yes') {
      connection = {
        plain: `You and your ${who} have lived in England or Wales your entire lives.`,
        legal: [jargon.A, jargon.C, jargon.D, jargon.E, jargon.F]
      };
    } else if (residedEntireLive === 'No' && CONNECTIONS.petitioner[petitionerConnection] &&
      CONNECTIONS.petitioner[petitionerConnection].respondent[respondentConnection]) {
      connection = CONNECTIONS.petitioner[petitionerConnection].respondent[respondentConnection];
    }

    if (!_.isEmpty(connection)) {
      payload.jurisdiction = connection;
    }

    context.checkYourAnswers = payload;
  }

  next(req, res, context) {
      console.log(req.session.helpWithFeesReference);
      if (req.session.helpWithFeesReference) {
        res.redirect('/done');
      }
      else {
        res.redirect('/pay/how');
      }
  }

};
