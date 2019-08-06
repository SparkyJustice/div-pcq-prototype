const Step = require('app/steps/Step');

const pleaseAnswer = 'Please answer the question';

module.exports = class Financials extends Step {
  get url() { return '/financial-arrangements'; }
  get template() { return 'prayer/financials'; }

  validate(req) {
    req.check('financialOrder', pleaseAnswer).matches(/(Yes|No)/);
  }

  next(req, res) {
    const requestOrder = req.session.Financials.financialOrder === 'Yes';
    const appliedForFees = req.session.HelpWithFees &&
      req.session.HelpWithFees.hasAppliedForFees &&
      req.session.HelpWithFees.hasAppliedForFees === 'Yes';
console.log(req.session.Financials);
      if (req.session.Financials.financialOrder == 'Yes'){
          res.redirect('/financials-advice');
      }
      else {
          res.redirect('/claim-costs'); //Temp position /claim-costs was here before.
      }
  }
};
