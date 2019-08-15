const Step = require('app/steps/Step');

const pleaseAnswer = 'Please answer the question';
const whenSuits = 'Please tell us when suits best';
const enterPhoneNumber = 'Please provide your phone number';

module.exports = class CardPayment extends Step {
  get url() { return '/pay/by-card'; }
  get template() { return 'pay/by-card'; }

  validate(req) {
    req.check('form', pleaseAnswer).all([
      req.check('phoneNumber', enterPhoneNumber).isPhoneNumber(),
      req.check('timeToCall', whenSuits).matches(/(morning|afternoon)/)
    ]);
  }

  next(req, res) {
    res.redirect('/optional-information');
  }
};
