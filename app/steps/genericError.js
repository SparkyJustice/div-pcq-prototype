const Step = require('app/steps/Step');

module.exports = class GenericError extends Step {
  get url() { return '/generic-error'; }

  get template() { return 'genericError'; }

};
