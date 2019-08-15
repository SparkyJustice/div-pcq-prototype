const Step = require('./steps/Step');
const validationMessages = require('app/validationMessages'),
      hasMarriageCertError = validationMessages.screeningQuestions.hasMarriageCert;

module.exports = class HasMarriageCertificate extends Step {

  get url() { return '/screening-questions/has-marriage-cert'; }

  get template() { return 'screening-questions/marriage-cert'; }

  next(req, res) {

    //if (req.body.hasMarriageCert==='Yes') {
      res.redirect('/screening-questions/financial-remedy');
    //} else {
    //  res.redirect('/exit/screening-questions/no-certificate');
    //}
  }

  transform (session, payload) {
    if (session.certificate && !('hasMarriageCert' in session.certificate)) return;
    payload['hasMarriageCert'] = (session.certificate.hasMarriageCert==='Yes');
  }

  validate(req) {
    req.check('hasMarriageCert', hasMarriageCertError).notEmpty();
  }
};
