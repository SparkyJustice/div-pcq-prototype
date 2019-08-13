var path = require('path'),
express = require('express'),
nunjucks = require('express-nunjucks'),
favicon = require('serve-favicon'),
app = express(),
realApp = require(__dirname + '/app/app.js'),
routes = require(__dirname + '/app/routes.js'),
jurisdictionRoutes = require(__dirname + '/app/jurisdiction.js'),
bodyParser = require('body-parser'),
config = require(__dirname + '/app/config.js'),
utils = require(__dirname + '/lib/utils.js'),
packageJson = require(__dirname + '/package.json'),
log4js = require('log4js'),
locals = require(__dirname + '/app/locals'),
logger = log4js.getLogger(),
sessions = require(__dirname + 'app/services/sessions'),
os = require('os'),
twilio = require('twilio'),
lodash = require('lodash'),
postcodeLookup = require(__dirname + '/app/services/postcodeLookup'),

// Grab environment variables specified in Procfile or as Heroku config vars
releaseVersion = packageJson.version,
username = process.env.USERNAME,
password = process.env.PASSWORD,
env = (process.env.NODE_ENV || 'development').toLowerCase(),
useAuth = (process.env.USE_AUTH || config.useAuth).toLowerCase(),
gitCommit = process.env.GIT_COMMIT;

// Authenticate against the environment-provided credentials, if running
// the app in production (Heroku, effectively)
if (env !== 'development' && env !== 'prototype' && useAuth === 'true') {
  app.use(utils.basicAuth(username, password));
}

// Application settings
app.set('view engine', 'html');
app.set('views', [__dirname + '/app/views', __dirname + '/lib/']);

app.set('json spaces', 40);

nunjucks(app, {
  autoescape: true,
  watch: true,
  noCache: true
});

// Middleware to serve static assets
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_template/assets'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit'));
app.use('/public/images/icons', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit/images'));
app.use('/docs', express.static(__dirname + '/divorce-design-docs/site'));

// Elements refers to icon folder instead of images folder
app.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'assets', 'images', 'favicon.ico')));

// Support for parsing data in POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(sessions.prod());
app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('No session found'));
  }
  next();
});

app.use(locals);

// Create default namespaces for nested answers
app.use(function (req, res, next) {
  req.session.noSaveAndReturn = req.session.noSaveAndReturn || "No";
  req.session.divorceWho = req.session.divorceWho || {};
  req.session.marriageType = req.session.marriageType || {};
  req.session.sameSexDivorceWho = req.session.sameSexDivorceWho || {};
  req.session.union_user = req.session.union_user || {};
  req.session.startUnion_user = req.session.startUnion_user || 'get married';
  req.session.petitioner = req.session.petitioner || {};
  req.session.petitioner.home = req.session.petitioner.home || {};
  req.session.petitioner.correspondence = req.session.petitioner.correspondence || {};
  req.session.respondent = req.session.respondent || {};
  req.session.respondent.aos = req.session.respondent.aos || {};
  req.session.respondent.correspondence = req.session.respondent.correspondence || {};
  req.session.respondent.home = req.session.respondent.home || {};
  req.session.corespondent = req.session.corespondent || {};
  req.session.corespondent.aos = req.session.corespondent.aos || {};
  req.session.corespondent.claimCosts = req.session.corespondent.claimCosts || {};
  req.session.placeOfMarriage = req.session.placeOfMarriage || {};
  req.session.facts = req.session.facts || {};
  req.session.arrangements = req.session.arrangements || {};
  req.session.financials = req.session.financials || {};
  req.session.certificate = req.session.certificate || {};
  req.session.supportingInformation = req.session.supportingInformation || {};
  req.session.statementOfCase = req.session.statementOfCase || {};
  req.session.adultery = req.session.adultery || {};
  req.session.separation = req.session.separation || {};
  req.session.unreasonable = req.session.unreasonable || {};
  req.session.adultery.corespondent = req.session.adultery.corespondent || {};
  req.session.desertion = req.session.desertion || {};
  req.session.jurisdiction = req.session.jurisdiction || {};
  req.session.jurisdiction.habitualResidence = req.session.jurisdiction.habitualResidence || "";
  req.session.jurisdiction.domiciled = req.session.jurisdiction.domiciled || "";
  req.session.jurisdiction.conditions = req.session.jurisdiction.conditions || {};
  req.session.jurisdiction.conditions.a = req.session.jurisdiction.conditions.a || "";
  req.session.jurisdiction.conditions.b = req.session.jurisdiction.conditions.b || "";
  req.session.jurisdiction.conditions.c = req.session.jurisdiction.conditions.c || "";
  req.session.jurisdiction.conditions.d = req.session.jurisdiction.conditions.d || "";
  req.session.jurisdiction.conditions.e = req.session.jurisdiction.conditions.e || "";
  req.session.jurisdiction.conditions.f = req.session.jurisdiction.conditions.f || "";
  req.session.jurisdiction.conditions.g = req.session.jurisdiction.conditions.g || "";
  req.session.divorceStatus = req.session.divorceStatus || {};
  req.session.mobileNumber = req.session.mobileNumber || "";
  req.session.emailAddress = req.session.emailAddress || "";
  req.session.oneTimeSMSCode = req.session.oneTimeSMSCode || "";
  req.session.mobileNumberVerified = req.session.mobileNumberVerified || "";
  req.session.respSolicitorAddress = req.session.respSolicitorAddress || {};
  req.session.whereLastLivedTogetherAddress = req.session.whereLastLivedTogetherAddress || {};
  req.session.whereLastLivedTogether = req.session.whereLastLivedTogether || "";
  req.session.respondent.respLivesAtLastLivedTogetherAddress = req.session.respondent.respLivesAtLastLivedTogetherAddress || "";
  req.session.path = req.path || "";
  req.session.wantsHelpWithFees = req.session.wantsHelpWithFees || "";
  req.session.checkYourAnswerMode = req.session.checkYourAnswersMode || "";
  req.session.unreasonable = req.session.unreasonable || {};
  req.session.paymentMethod = req.session.paymentMethod || "";
  req.session.paymentSuccess = req.session.paymentSuccess || "";
  req.session.separation = req.session.separation || {};
  req.session.separation.marriageOverDate = req.session.separation.marriageOverDate || {};
  req.session.separation.separationDate = req.session.separation.separationDate || {};
  req.session.applicationDate = req.session.applicationDate || {};
  req.session.courtDocumentsAvailable = req.session.courtDocumentsAvailable || {};
  req.session.arrayCourtDocumentsAvailable = req.session.arrayCourtDocumentsAvailable || {};
  req.session.claimCosts = req.session.claimCosts || {};
  req.session.aos = req.session.aos || {};
  next();
});

//put this in /app/utils sometime.
Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

// Disallow search index idexing
app.use(function (req, res, next) {
  // Setting headers stops pages being indexed even if indexed pages link to them.
  res.setHeader('X-Robots-Tag', 'noindex');
  next();
});

app.use('/', function (req, res, next) {
    req.session.serviceName = "Apply for a divorce";
    req.session.noSaveAndReturn = "No";
  next();
});

app.use('/IDAM/', function (req, res, next) {
    req.session.serviceName = " ";
  next();
});

app.use('/screening-questions/', function (req, res, next) {
    req.session.serviceName = "Apply for a divorce";
    req.session.noSaveAndReturn = "Yes";
  next();
});

app.use('/aos/', function (req, res, next) {
    req.session.serviceName = "Respond to a divorce application";
    req.session.noSaveAndReturn = "Yes";
  next();
});

app.use('/corespondent-aos/', function (req, res, next) {
    req.session.serviceName = "Respond to a divorce application";
    req.session.noSaveAndReturn = "Yes";
  next();
});

app.use('/dn-stage/', function (req, res, next) {
    req.session.serviceName = "Apply for a divorce";
    req.session.noSaveAndReturn = "Yes";
  next();
});

app.use('/', realApp);
app.use('/', routes);

app.get('/postcode-lookup', postcodeLookup);
app.use('/concepts/jurisdiction', jurisdictionRoutes);

//Health check endpoint
app.get('/healthcheck', function (req, res) {
  res.json(
    {
      status: 'UP',
      uptime: process.uptime(),
      host: os.hostname(),
      hash: gitCommit
    });
});

// Strip .html and .htm if provided
app.get(/\.html?$/i, function (req, res) {
  var path = req.path;
  var parts = path.split('.');
  parts.pop();
  path = parts.join('.');
  res.redirect(path);
});

// auto render any view that exists
app.get(/^\/([^.]+)$/, function (req, res) {

  var path = (req.params[0]);

  res.render(path, function (err, html) {
    if (err) {
      res.render(path + '/index', function (err2, html) {
        if (err2) {
          logger.error(err);
          res.status(404).send(err + '<br>' + err2);
        } else {
          res.end(html);
        }
      });
    } else {
      res.end(html);
    }
  });

});

logger.info('\nGOV.UK Prototype kit v' + releaseVersion);
// Display warning not to use kit for production services.
logger.info('\nNOTICE: the kit is for building prototypes, do not use it for production services.');

// start the app
utils.findAvailablePort(app);
