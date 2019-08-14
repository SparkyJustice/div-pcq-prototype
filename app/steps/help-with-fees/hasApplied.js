const Step = require('./app/steps/Step'),
validationMessages = require('app/validationMessages'),
config = require('app/config');

module.exports = class HelpWithFees extends Step {

  get url() {
    return '/help-with-fees';
  }

  get template() {
    return 'help-with-fees';
  }

  locals(context) {
    context.divorceFee = config.divorceFee;
    context.referenceError = () => {
      if (!('fields' in context)) return false;
      return ('reference' in context.fields && context.fields.reference.error)
      || ('r4' in context.fields && context.fields.r4.error)
      || ('r5' in context.fields && context.fields.r5.error)
      || ('r6' in context.fields && context.fields.r6.error);
    };
  }

  next(req, res) {
    res.redirect('jurisdiction/your-connections');
  }

  transform(session, payload) {
    if (!('hasAppliedForFees' in session)) return;
    payload['hasAppliedForFees'] = (session.hasAppliedForFees === 'Yes');
  }

  validate(req) {
    //TODO: proper validation of help with fees reference number (TBD)
    req.check('hasAppliedForFees', validationMessages.notAnswered).notEmpty();
    if (req.body.hasAppliedForFees === 'Yes') {
      req.check('reference', validationMessages.helpWithFees.referenceNumberMissing).all([
        req.check('r4', validationMessages.helpWithFees.referenceNumberValueMissing).notEmpty(),
        req.check('r5', validationMessages.helpWithFees.referenceNumberValueMissing).notEmpty(),
        req.check('r6', validationMessages.helpWithFees.referenceNumberValueMissing).notEmpty()
      ]);
    }
  }

};
