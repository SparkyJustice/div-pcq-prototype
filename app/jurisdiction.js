var express = require('express');
var router = express.Router();

var jurisdictionRoutes = [
  'exit',
  'habitual-residence',
  'habitually-resident-non-eu',
  'habitually-resident-together',
  'husband-wife-permanent-home',
  'permanent-home',
  'residence-time',
  'respondent-habitually-resident',
  'your-permanent-home'
];

jurisdictionRoutes.forEach(function (path) {
  router.get('/' + path, function (req, res) {
    res.render('jurisdiction/' + path);
  });
});

var conceptRoutes = [
  'last-resort',
  'question-concept',
  'respondent-connected',
  'you-connected',
  'question-entire-lives',
  'question-entire-lives2',
  'petitioner-connection',
  'your-husband-wife-connections',
  'exit-not-permanent-home'
];

conceptRoutes.forEach(function (path) {
  router.get('/' + path, function (req, res) {
    res.render('jurisdiction/concepts/' + path);
  });
});

router.post('/you-connected', function (req, res) {
  res.redirect('residence-time');
});

router.post('/residence-time', function (req, res) {
  res.redirect('respondent-connected');
});

router.post('/respondent-connected', function (req, res) {
  res.redirect('respondent-connected');
});

router.post('/habitual-residence', function (req, res) {

  var petitioner = req.body.petitioner;
  var respondent = req.body.respondent;

  if (petitioner === 'Yes' && respondent === 'Yes') {
    res.redirect('both/residence-time');
  } else if (petitioner === 'Yes' && respondent === 'No') {
    res.redirect('petitioner/residence-time');
  } else if (petitioner === 'No' && respondent === 'Yes') {
    res.redirect('respondent/habitually-resident-together');
  } else {
    res.redirect('neither/permanent-home');
  }
});

router.get('/both/residence-time', function (req, res) {
  res.render('jurisdiction/residence-time');
});

router.post('/both/residence-time', function (req, res) {

  req.session.jurisdiction.residenceTime = req.body.residenceTime;

  res.redirect('permanent-home');
});

router.get('/both/permanent-home', function (req, res) {
  res.render('jurisdiction/permanent-home');
});

router.post('/both/permanent-home', function (req, res) {

  var petitioner = req.body.petitioner;
  var respondent = req.body.respondent;

  req.session.jurisdiction.petitionerPermanentHome = petitioner;
  req.session.jurisdiction.respondentPermanentHome = respondent;

  res.redirect('permanent-home');
});

router.get('/petitioner/residence-time', function (req, res) {
  res.render('jurisdiction/residence-time');
});

router.post('/petitioner/residence-time', function (req, res) {

  req.session.jurisdiction.residenceTime = req.body.residenceTime;

  res.redirect('habitually-resident-together');
});

router.get('/petitioner/habitually-resident-together', function (req, res) {
  res.render('jurisdiction/habitually-resident-together');
});

router.post('/petitioner/habitually-resident-together', function (req, res) {
  res.redirect('permanent-home');
});

router.get('/petitioner/permanent-home', function (req, res) {
  res.render('jurisdiction/permanent-home');
});

router.post('/petitioner/permanent-home', function (req, res) {

  var petitioner = req.body.petitioner;
  var respondent = req.body.respondent;

  req.session.jurisdiction.petitionerPermanentHome = petitioner;
  req.session.jurisdiction.respondentPermanentHome = respondent;

  if (petitioner === 'No' && respondent === 'Yes') {
    res.redirect('habitually-resident-non-eu');
  } else {
    res.redirect('respondent-habitually-resident-non-eu');
  }
});

router.get('/petitioner/habitually-resident-non-eu', function (req, res) {
  res.render('jurisdiction/habitually-resident-non-eu');
});

router.post('/petitioner/habitually-resident-non-eu', function (req, res) {
  res.redirect('habitually-resident-non-eu');
});

router.get('/petitioner/respondent-habitually-resident-non-eu', function (req, res) {
  res.render('jurisdiction/respondent-habitually-resident-non-eu');
});

router.post('/petitioner/respondent-habitually-resident-non-eu', function (req, res) {
  res.redirect('respondent-habitually-resident-non-eu');
});

router.get('/petitioner/habitually-resident-non-eu', function (req, res) {
  res.render('jurisdiction/habitually-resident-non-eu');
});

router.post('/petitioner/habitually-resident-non-eu', function (req, res) {
  res.redirect('habitually-resident-non-eu');
});

router.get('/respondent/habitually-resident-together', function (req, res) {
  res.render('jurisdiction/habitually-resident-together');
});

router.post('/respondent/habitually-resident-together', function (req, res) {
  res.redirect('permanent-home');
});

router.get('/respondent/habitually-resident-non-eu', function (req, res) {
  res.render('jurisdiction/habitually-resident-non-eu');
});

router.post('/respondent/habitually-resident-non-eu', function (req, res) {
  res.redirect('habitually-resident-non-eu');
});

router.get('/respondent/permanent-home', function (req, res) {
  res.render('jurisdiction/permanent-home');
});

router.post('/respondent/permanent-home', function (req, res) {

  var petitioner = req.body.petitioner;
  var respondent = req.body.respondent;

  if (petitioner === 'No' && respondent === 'Yes') {
    res.redirect('habitually-resident-non-eu');
  } else if (petitioner === 'Yes' && respondent === 'Yes') {
    res.redirect('permanent-home');
  } else {
    res.redirect('respondent-habitually-resident-non-eu');
  }
});

router.get('/respondent/respondent-habitually-resident-non-eu', function (req, res) {
  res.render('jurisdiction/respondent-habitually-resident-non-eu');
});

router.post('/respondent/respondent-habitually-resident-non-eu', function (req, res) {
  res.redirect('respondent-habitually-resident-non-eu');
});

router.get('/neither/permanent-home', function (req, res) {
  res.render('jurisdiction/permanent-home');
});

router.post('/neither/permanent-home', function (req, res) {

  var petitioner = req.body.petitioner;
  var respondent = req.body.respondent;

  if (petitioner === 'No' && respondent === 'Yes') {
    res.redirect('habitually-resident-non-eu');
  } else if (petitioner === 'Yes' && respondent === 'No') {
    res.redirect('respondent-habitually-resident-non-eu');
  } else if (petitioner === 'No' && respondent === 'No') {
    res.redirect('../exit');
  } else {
    res.redirect('permanent-home');
  }
});

router.get('/neither/respondent-habitually-resident-non-eu', function (req, res) {
  res.render('jurisdiction/respondent-habitually-resident-non-eu');
});

router.post('/neither/respondent-habitually-resident-non-eu', function (req, res) {
  res.redirect('respondent-habitually-resident-non-eu');
});

router.get('/neither/habitually-resident-non-eu', function (req, res) {
  res.render('jurisdiction/habitually-resident-non-eu');
});

router.post('/neither/habitually-resident-non-eu', function (req, res) {
  res.redirect('habitually-resident-non-eu');
});

//Version5 Changes for jurisdiction concepts

router.post('/question-entire-lives', function (req, res) {
  req.session.jurisdiction.livingQuestion = req.body.livingQuestion;
  if (req.body.livingQuestion === 'Yes') {
    res.redirect('/concepts/jurisdiction/check-your-connections');
  } else {
    res.redirect('/concepts/jurisdiction/petitioner-connection');
  }
});

router.post('/petitioner-connection', function (req, res) {
  req.session.jurisdiction.petitionerConnection = req.body.connection;
  if (req.body.connection === 'domiciledOnly' || req.body.connection === 'neither') {
    res.redirect('/concepts/jurisdiction/exit-not-permanent-home');
  } else {
    res.redirect('/concepts/jurisdiction/your-husband-wife-connections');
  }
});

router.post('/your-husband-wife-connections', function (req, res) {
  req.session.jurisdiction.respondentConnection = req.body.respondentConnection;
  if (req.body.respondentConnection === 'domiciledOnly' || req.body.respondentConnection === 'neither') {
    res.redirect('/concepts/jurisdiction/exit-not-permanent-home');
  } else {
    res.redirect('/concepts/jurisdiction/last12months');
  }
});
router.get('/last12months', function (req, res) {
  res.render('jurisdiction/concepts/last12months', {
    askSixMonths: ((req.session.jurisdiction.petitionerConnection === 'HRD'
    && req.session.jurisdiction.respondentConnection === 'HR')
    || (req.session.jurisdiction.petitionerConnection === 'HRD'
    && req.session.jurisdiction.respondentConnection === 'both'))
  });


});

router.post('/last12months', function (req, res) {
  req.session.jurisdiction.last12Months = req.body.last12Months;
  req.session.jurisdiction.last6Months = req.body.last6Months;
  res.redirect('/concepts/jurisdiction/check-your-connections');
});

router.post('/check-your-connections', function (req, res) {
  res.redirect('/concepts/jurisdiction/check-your-connections');
});

router.get('/check-your-connections', function (req, res) {
  res.render('jurisdiction/concepts/check-your-connections', {
    eitherPartyHabitualResident: (req.session.jurisdiction.livingQuestion === 'Yes'
    || req.session.jurisdiction.petitionerConnection === 'HR'
    || req.session.jurisdiction.respondentConnection === 'HR'
    || req.session.jurisdiction.petitionerConnection === 'HRD'
    || req.session.jurisdiction.respondentConnection === 'both'),
    eitherPartyDomicile: (req.session.jurisdiction.livingQuestion === 'Yes'
    || req.session.jurisdiction.petitionerConnection === 'HRD'
    || req.session.jurisdiction.respondentConnection === 'both'),
    answeredEitherPartyHabitualResident: (req.session.jurisdiction.livingQuestion === 'Yes'
    || req.session.jurisdiction.petitionerConnection === 'HR'
    || req.session.jurisdiction.petitionerConnection === 'HRD'
    || req.session.jurisdiction.respondentConnection === 'both'
    || req.session.jurisdiction.respondentConnection === 'HR'),
    answeredLivinglast12MonthsYes: (req.session.jurisdiction.livingQuestion === 'Yes'
    || req.session.jurisdiction.last12Months === 'Yes'),
    answeredLivinglast6MonthsYes: (req.session.jurisdiction.livingQuestion === 'Yes'
    || ((req.session.jurisdiction.petitionerConnection === 'HRD' &&
    req.session.jurisdiction.respondentConnection === 'HR' &&
    req.session.jurisdiction.last12Months === 'Yes') || req.session.jurisdiction.last6Months === 'Yes')
    || ((req.session.jurisdiction.petitionerConnection === 'HRD' &&
    req.session.jurisdiction.respondentConnection === 'both' &&
    req.session.jurisdiction.last12Months === 'Yes') || req.session.jurisdiction.last6Months === 'Yes')),
    answeredEitherPartyDomicile: (req.session.jurisdiction.livingQuestion === 'Yes'
    || (req.session.jurisdiction.petitionerConnection === 'HRD' &&
    req.session.jurisdiction.respondentConnection === 'both')),
    changeLink: '/concepts/jurisdiction/question-entire-lives'
  });
});
module.exports = router;
