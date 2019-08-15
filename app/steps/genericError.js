const Step = require(__dirname + '/Step');

module.exports = class GenericError extends Step {
  get url() { return '/generic-error'; }

  get template() { return 'genericError'; }

};
