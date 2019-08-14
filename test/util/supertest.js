const express = require('express');
const request = require('supertest');
const sessions = require('app/services/sessions');
const validations = require(__dirname + '/app/services/validations');
const locals = require('app/locals');
const Flags = require('app/services/flags');
const bodyParser = require('body-parser');

function testApp(session = {}) {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(validations);
  app.use(locals);
  app.use(sessions.inmemory());
  app.use(require('app/locals.js'));
  app.set('view engine', 'html');
  app.set('views', ['app/views/', 'lib/', 'test/views']);
  app.use('/public', express.static(__dirname + '/public'));
  app.use('/public', express.static(__dirname + '/govuk_modules/govuk_template/assets'));
  app.use('/public', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit'));
  app.use('/public/images/icons', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit/images'));
  const nunjucks = require('express-nunjucks');

  app.use(/^(?!\/check-session$).*/, (req, res, next) => {
    req.session = Object.assign(req.session, session);
    next();
  });

  const flags = new Flags();
  flags.bind(app);

  app.get('/check-session', (req, res) => {
    res.send(req.session);
  });

  nunjucks(app, {
    autoescape: true,
    watch: true,
    noCache: true
  });

  return app;
}

const withSession = (app, res, done, callback) => {
  const setCookie = res.headers['set-cookie'];
  const sessionCookie = (setCookie && setCookie[0]) || undefined;

  request(app)
    .get('/check-session')
    .set('Cookie', sessionCookie)
    .expect(function(res) {
      callback(res.body);
    })
    .expect(200, done);
};

module.exports = {
  request,
  testApp,
  withSession
};
