const Router = require('express').Router;
const Context = require(__dirname + '/Context');

module.exports = class Step {
  get url() { throw new TypeError('Must override #url'); }
  get template() { throw new TypeError('Must override #template'); }
  get name() { return this.constructor.name; }

  next(req, res) {
    res.redirect(this.url);
  }

  validate() {}
  transform() {}
  locals(context) { return context; }

  get router() {
    if (typeof this._router !== 'undefined') return this._router;

    this._router = Router();
    this._router.get('/', this.get.bind(this));
    this._router.post('/', this.post.bind(this));
    return this._router;
  }

  get(req, res) {
    req.session[this.name] = req.session[this.name] || {};
    const context = {
      session: req.session,
      errors: req.session.errors || [],
      fields: new Context()
          .withValues(req.session[this.name])
          .merge(req.session.tempAnswers)
          .withErrors(req.session.errors)
    };
    req.session.errors = undefined;

    res.render(this.template, this.locals(context) || context);
  }

  post(req, res) {
    const fields = new Context().withValues(req.body);
    this.validate(req, fields);
    fields.withErrors(req.validationErrors());

    if (fields.hasErrors() && req.flags.validation) {
      req.session.errors = fields.errors();
      req.session.tempAnswers = fields;
      res.redirect(this.url);
    } else {
      req.session.errors = undefined;
      req.session.tempAnswers = undefined;
      req.session[this.name] = fields.values();
      this.next(req, res);
    }
  }

  bind(app) {
    app.use(this.url, this.router);
  }
};
