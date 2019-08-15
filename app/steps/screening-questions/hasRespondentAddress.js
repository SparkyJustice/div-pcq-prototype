const Step = require('./../Step');
const validationMessages = require('app/validationMessages'),
      hasRespondentAddressErrorMsg = validationMessages.notAnswered;

module.exports = class HasRespondentAddress extends Step {

  get url() { return '/screening-questions/respondent-address'; }

  get template() { return 'screening-questions/has-respondent-address'; }

  next(req, res) {

   // if (req.body.hasRespondentAddress === 'Yes') {
      res.redirect('/screening-questions/has-marriage-cert');
   // } else {
   //   res.redirect('/exit/screening-questions/no-respondent-address');
   // }
  }

  transform (session, payload) {
    if (!('hasRespondentAddress' in session)) return;
    payload['hasRespondentAddress'] = (session.hasRespondentAddress === 'Yes');
  }

  validate(req) {
    req.check('hasRespondentAddress', hasRespondentAddressErrorMsg).notEmpty();
  }
};
