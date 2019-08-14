const Step = require('./app/steps/Step');
const check = require('check-types');
const config = require('app/config');

module.exports = class Done extends Step {
  get url() { return '/done'; }

  get template() { return 'done'; }

  locals(context) {
    const answeredFinancials = check.like(context,
      { session: { Financials: { financialOrder: ''} } }
    );
    const answeredCardPayment = check.like(context,
      { session: { HowToPay: { method: ''} } }
    );
    const answeredHelpWithFees = check.like(context,
    { session: { HelpWithFees: { hasAppliedForFees: ''} } }
    );
    context.financialOrder = () => {
      return answeredFinancials &&
             context.session.Financials.financialOrder === 'Yes';
    };
    context.cardPayment = () => {
      return answeredCardPayment &&
             context.session.HowToPay.method === 'by-card';
    };
    context.hasAppliedForFees = () => {
      return answeredHelpWithFees &&
      context.session.HelpWithFees.hasAppliedForFees === 'Yes';
    };
    context.divorceFee = config.divorceFee;
    context.pdfGeneratorServiceUrl = process.env.PDF_GENERATOR_SERVICE_URL;
  }

};
