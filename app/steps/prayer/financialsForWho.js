const Step = require('./../app/steps/Step');

module.exports = class FinancialsForWho extends Step {
  get url() { return '/financial-arrangements/for-who'; }
  get template() { return 'prayer/financialsForWho'; }

  transform(session, payload) {
    if('FinancialsForWho' in session && 'claimFrom' in session.FinancialsForWho) {
      payload.financials = {};

      const claimFor = session.FinancialsForWho.claimFrom;

      if(claimFor.includes('petitioner') && claimFor.includes('children')) {
        payload.financials.statement = 
          'You reserve the right to apply for a financial order for:';
        payload.financials.who = ['yourself', 'the children'];

      } else if (claimFor.includes('petitioner')) {
        payload.financials.statement = 
          'You reserve the right to apply for a financial order in the future';
      } else if (claimFor.includes('children')) {
        payload.financials.statement = 
          'You reserve the right to apply for a financial order for the children';
      }
    } else if ('Financials' in session) {
      payload.financials = {};
      payload.financials.statement = 
        'You do not reserve the right to apply for a financial order';
    }
  }

  next(req, res) {
	res.redirect('/claim-costs');

  }
};

