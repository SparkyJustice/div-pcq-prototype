const { expect, sinon } = require('test/util/chai');
const { request, testApp, withSession } = require('test/util/supertest');
const { stubReq } = require('test/util/validations');
const Step = require('./../steps/Step');

describe('Step', () => {
  describe('#name', () => {
    it('returns Step if not extended', () => {
      expect(new Step().name).to.eql('Step');
    });
    it('returns class name if extended', () => {
      Step.prototype.testName = function() {
        return this.name;
      };
      class Foo extends Step {}
      expect(new Foo().name).to.eql('Foo');
      expect(new Foo().testName()).to.eql('Foo');
    });
  });

  describe('#url', () => {
    it('throws if not overridden', () => {
      expect(() => new Step().url).to.throw('Must override #url');
    });
    it('doesn\'t throw if overriden', () => {
      class Foo extends Step {
        get url() { return '/foo'; }
      }
      expect(new Foo().url).to.eql('/foo');
    });
  });

  describe('#template', () => {
    it('throws if not overridden', () => {
      expect(() => new Step().template).to.throw('Must override #template');
    });
    it('doesn\'t throw if overriden', () => {
      class Foo extends Step {
        get template() { return 'foo.html'; }
      }
      expect(new Foo().template).to.eql('foo.html');
    });
  });

  describe('#validate', () => {
    it('adds no errors to request by default', () => {
      const req = stubReq({});
      new Step().validate(req);
      expect(req.validationErrors()).to.eql(false);
    });
    it('executes overridden validations', () => {
      const req = stubReq({});
      const fakeErrors = [{ msg: 'Error', param: 'foo', value: undefined }];
      class Foo extends Step {
        validate(req) {
          req.check('foo', 'Error').notEmpty();
        }
      }
      new Foo().validate(req);
      expect(req.validationErrors()).to.eql(fakeErrors);
    });
  });

  describe('#transform', () => {
    it('does nothing by default', () => {
      const session = { foo: 'dodo' };
      const data = {};
      new Step().transform(session, data);
      expect(data).to.eql({});
    });
    it('executes overridden validations', () => {
      class Foo extends Step {
        transform(session, data) {
          data['likesDodos'] = session.foo === 'dodo';
        }
      }
      const session = { foo: 'dodo' };
      const data = {};
      new Foo().transform(session, data);

      expect(data).to.eql({ likesDodos: true });
    });
  });

  describe('#locals', () => {
    it('returns the context without modifying by default', () => {
      expect(new Step().locals({})).to.eql({});
    });
  });

  describe('#bind', () => {
    it('binds the router to an app on the steps url', () => {
      const stubApp = { use: () => {} };
      sinon.stub(stubApp, 'use');
      class Foo extends Step {
        get url() { return '/foo'; }
      }
      const step = new Foo();

      step.bind(stubApp);
      expect(stubApp.use).to.have.been.calledWith(step.url, step.router);
    });
  });

  describe('#router', () => {
    it('provides a router for app.js to consume', () => {
      expect(new Step().router).to.be.a('function');
    });

    it('binds GET and POST endpoints', () => {
      const step = new Step();
      const routes = step.router.stack
        .filter(layer => layer.route)
        .map(layer => layer.route);

      const get = routes.filter(route => route.methods.get);
      expect(get).to.have.length(1);

      const post = routes.filter(route => route.methods.post);
      expect(post).to.have.length(1);

      expect(routes.every(route => route.path === '/')).to.be.true;
    });

    describe('GET endpoint', () => {
      it('renders the template provided', (done) => {
        class Foo extends Step {
          get template() { return 'helloworld'; }
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp();
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/Hello World!/)
          .expect(200, done);
      });
      it('includes errors in render locals', (done) => {
        class Foo extends Step {
          get template() { return 'errors'; }
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp({ errors: [{
          msg: 'Please answer this question',
          param: 'form',
          value: undefined
        }]});
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/form - Please answer this question/)
          .expect(200, done);
      });
      it('wipes errors from session when rendered', (done) => {
        class Foo extends Step {
          get template() { return 'errors'; }
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp({ errors: [{
          msg: 'Please answer this question',
          param: 'form',
          value: undefined
        }]});
        step.bind(app);

        request(app)
          .get(step.url)
          .expect(200)
          .end((err, res) => {
            withSession(app, res, done, session => {
              expect(session).to.not.contain.key('errors');
            });
          });
      });
      it('includes session in render locals', (done) => {
        class Foo extends Step {
          get template() { return 'session'; }
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp({ Bar: {
          cake: 'Jaffa'
        }});
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/cake: Jaffa/)
          .expect(200, done);
      });
      it('includes fields in render locals', (done) => {
        class Foo extends Step {
          get template() { return 'fields'; }
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp({ Foo: {
          name: 'Jane Smith',
          biscuit: 'shortbread'
        }});
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/name: Jane Smith/)
          .expect(/biscuit: shortbread/)
          .expect(200, done);
      });
      it('fields contain all tempAnswers', (done) => {
        class Foo extends Step {
          get template() { return 'fields'; }
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp({
          tempAnswers: {
            name: { value: 'Jane Smith' }
          },
          Foo: {
            biscuit: 'shortbread'
          }});
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/name: Jane Smith/)
          .expect(/biscuit: shortbread/)
          .expect(200, done);
      });
      it('fields contain error messages', (done) => {
        class Foo extends Step {
          get template() { return 'field-errors'; }
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp({
          Foo: {
            name: 'Jane Smith',
            biscuit: 'shortbread'
          },
          errors: [{
            msg: 'Bad name',
            param: 'name',
            value: 'Jane Smith'
          }]
        });
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/name: true Bad name/)
          .expect(/biscuit: false/)
          .expect(200, done);
      });
      it('tempAnswers value overrides session value', (done) => {
        class Foo extends Step {
          get template() { return 'fields'; }
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp({
          tempAnswers: { name: { value: 'jane smith' } },
          Foo: { name: 'jane jones' }
        });
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/name: jane smith/)
          .expect(200, done);
      });
      it('validation value overrides other values', (done) => {
        class Foo extends Step {
          get template() { return 'fields'; }
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp({
          Foo: { name: 'jane smith' },
          tempAnswers: { name: { value: 'jane jones' } },
          errors: [{
            msg: 'Bad name',
            param: 'name',
            value: 'Jane Smith'
          }]
        });
        step.bind(app);

        request(app)
          .get(step.url)
          .expect('Content-type', /html/)
          .expect(/name: Jane Smith/)
          .expect(200, done);
      });
    });

    describe('POST endpoint', () => {
      it('executes next function if successful', (done) => {
        class Foo extends Step {
          get url() { return '/'; }
          next(req, res) {
            res.redirect('/next-step');
          }
        }
        const step = new Foo();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .expect('location', '/next-step')
          .expect(302, done);
      });
      it('stores answers in the session if successful', (done) => {
        const answers = {
          cake: 'Jaffa',
          tea: 'Breakfast'
        };
        class Foo extends Step {
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send(answers)
          .expect(302)
          .end((err, res) => {
            withSession(app, res, done, session => {
              expect(session).to.contain.key('Foo');
              expect(session.Foo).to.eql(answers);
            });
          });
      });
      it('stores answers temporarily if unsuccessful', (done) => {
        const answers = {
          cake: 'Jaffa',
          tea: 'Breakfast'
        };
        class Foo extends Step {
          get url() { return '/'; }
          validate(req) {
            req.check('cake', 'Error').equals('Lemon Drizzle');
            return req.validationErrors();
          }
        }
        const step = new Foo();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send(answers)
          .expect(302)
          .end((err, res) => {
            withSession(app, res, done, session => {
              expect(session).to.not.contain.key('Foo');
              expect(session.tempAnswers).to.eql({
                cake: {
                  value: 'Jaffa',
                  errorMessage: 'Error'
                },
                tea: { value: 'Breakfast' }
              });
            });
          });
      });
      it('unsets tempAnswers and errors if successful', (done) => {
        const answers = {
          cake: { value: 'Jaffa' },
          tea: { value: 'Breakfast'}
        };
        class Foo extends Step {
          get url() { return '/'; }
        }
        const step = new Foo();
        const app = testApp({
          errors: [{ msg: 'Error', param: 'cake' }],
          tempAnswers: answers
        });
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send(answers)
          .expect(302)
          .end((err, res) => {
            withSession(app, res, done, session => {
              expect(session).to.not.contain.key('tempAnswers');
              expect(session).to.not.contain.key('errors');
            });
          });
      });
      it('doesn\'t trigger validations if flags.validation is false', (done) => {
        class Foo extends Step {
          get url() { return '/'; }
          validate(req) {
            req.check('foo', 'error').notEmpty();
          }
          next(req, res) {
            res.redirect('/next-step');
          }
        }
        const step = new Foo();
        const app = testApp({
          Flags: { validation: false }
        });
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send({})
          .expect('location', '/next-step')
          .expect(302, done);
      });
      it('redirects back to the step if unsuccessful', (done) => {
        class Foo extends Step {
          get url() { return '/'; }
          validate(req) {
            req.check('foo', 'error').notEmpty();
            return req.validationErrors();
          }
        }
        const step = new Foo();
        const app = testApp();
        step.bind(app);

        request(app)
          .post(step.url)
          .type('form')
          .send({})
          .expect('location', step.url)
          .expect(302)
          .end((err, res) => {
            withSession(app, res, done, session => {
              expect(session).to.contain.key('errors');
              expect(session.errors).to.eql([{
                msg: 'error',
                param: 'foo'
              }]);
            });
          });
      });
    });
  });
});
