var moment = require('moment');
var addressLookup = require('./services/address_lookup.js');
var express = require('express');
var router = express.Router();
var config = require('./config.js');

const node_env = (process.env.NODE_ENV || 'development').toLowerCase()

router.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

router.get('/check-session', function (req, res) {
  res.json(req.session);
});

router.post('/onboarding/create-password', function (req, res) {
    res.redirect('/onboarding/check-your-email');
});

router.get('/IDAM/login', function (req, res) {
    if (req.query.continue_url) {
        req.session.continueUrl = req.query.continue_url;
    };
    if (req.session.isLoggedIn == "yes") {
        res.redirect(req.session.continueUrl);
    }
    else
    {
        res.render('IDAM/login', {status: req.query.status || req.session.status});
    }
});

router.post('/IDAM/login', function (req, res) {
    req.session.isLoggedIn = "yes";
    if(req.session.continueUrl === '/aos/progress-bar/respond' && !req.session.caseIslinked) {
        return res.redirect('/IDAM/respond-with-pin');
    }
    res.redirect(req.session.continueUrl);
});

router.get('/IDAM/create-password', function (req, res) {
    if (req.query.continue_url) {
        req.session.continueUrl = req.query.continue_url;
    };
    if (req.query.status) {
        req.session.status = req.query.status;
    };
    res.render('IDAM/create-password');
});

router.post('/IDAM/create-password', function (req, res) {
    return res.redirect('/IDAM/account-created');
});

router.get('/', function (req, res) {
  res.render(
  'index', {
    sandboxUrl: config.sanboxUrl,
    herokuUrl: config.herokuUrl,
    herokuPrintAndPostRelease: config.herokuPrintAndPostRelease,
    herokuSubmitOnlinePayRelease: config.herokuSubmitOnlinePayRelease,
    //don't forget to add equivalent url in post request or refactor this!
    herokuV31Url: config.herokuV31Url,
    herokuV30Url: config.herokuV30Url,
    herokuV29Url: config.herokuV29Url,
    herokuV28Url: config.herokuV28Url,
    herokuV27Url: config.herokuV27Url,
    herokuV26Url: config.herokuV26Url,
    herokuV25Url: config.herokuV25Url,
    herokuV24Url: config.herokuV24Url,
    herokuV23Url: config.herokuV23Url,
    herokuV22Url: config.herokuV22Url,
    herokuV21Url: config.herokuV21Url,
    herokuV20Url: config.herokuV20Url,
    herokuV19Url: config.herokuV19Url,
    herokuV18Url: config.herokuV18Url,
    herokuV17Url: config.herokuV17Url,
    herokuV16Url: config.herokuV16Url,
    herokuV15Url: config.herokuV15Url,
    herokuV14Url: config.herokuV14Url,
    herokuV13Url: config.herokuV13Url,
    herokuV12Url: config.herokuV12Url,
    herokuV11Url: config.herokuV11Url,
    herokuV10Url: config.herokuV10Url,
    herokuV9Url: config.herokuV9Url,
    herokuV8Url: config.herokuV8Url,
    herokuV7Url: config.herokuV7Url,
    herokuV6Url: config.herokuV6Url,
    herokuV5Url: config.herokuV5Url,
    herokuV4Url: config.herokuV4Url,
    herokuV3Url: config.herokuV3Url,
    herokuV2Url: config.herokuV2Url,
    herokuV1Url: config.herokuV1Url
  }
  );
});

router.post('/', function (req, res) {
    req.session = req.session || {};
    req.session.divorceWho = req.body.divorceWho;
    req.session.facts.reason = req.body.reason;
    /* Respondent AOS */
    req.session.respondent.aos.willPayCosts = req.body.willPayCosts;
    req.session.aos.defend = req.body.willDefend;
    req.session.aos.consent = req.body.consent;
    req.session.respondent.aos.admitAdultery = req.body.admitAdultery;
    console.log(req.session.aos.consent);
    res.render(
        'index', {
        parametersSet: true,
        sandboxUrl: config.sanboxUrl,
        herokuUrl: config.herokuUrl,
        herokuPrintAndPostRelease: config.herokuPrintAndPostRelease,
        herokuSubmitOnlinePayRelease: config.herokuSubmitOnlinePayRelease,
        //don't forget to add equivalent url in get request or refactor this!
        herokuV31Url: config.herokuV31Url,
        herokuV30Url: config.herokuV30Url,
        herokuV29Url: config.herokuV29Url,
        herokuV28Url: config.herokuV28Url,
        herokuV27Url: config.herokuV27Url,
        herokuV26Url: config.herokuV26Url,
        herokuV25Url: config.herokuV25Url,
        herokuV24Url: config.herokuV24Url,
        herokuV23Url: config.herokuV23Url,
        herokuV22Url: config.herokuV22Url,
        herokuV21Url: config.herokuV21Url,
        herokuV20Url: config.herokuV20Url,
        herokuV19Url: config.herokuV19Url,
        herokuV18Url: config.herokuV18Url,
        herokuV17Url: config.herokuV17Url,
        herokuV16Url: config.herokuV16Url,
        herokuV15Url: config.herokuV15Url,
        herokuV14Url: config.herokuV14Url,
        herokuV13Url: config.herokuV13Url,
        herokuV12Url: config.herokuV12Url,
        herokuV11Url: config.herokuV11Url,
        herokuV10Url: config.herokuV10Url,
        herokuV9Url: config.herokuV9Url,
        herokuV8Url: config.herokuV8Url,
        herokuV7Url: config.herokuV7Url,
        herokuV6Url: config.herokuV6Url,
        herokuV5Url: config.herokuV5Url,
        herokuV4Url: config.herokuV4Url,
        herokuV3Url: config.herokuV3Url,
        herokuV2Url: config.herokuV2Url,
        herokuV1Url: config.herokuV1Url
      }
      );
});

router.post('/statement-of-case/unreasonable/supporting-information-correction-introduction', function (req, res) {
    res.redirect('supporting-information-correction-form');
});

router.post('/statement-of-case/unreasonable/supporting-information-correction-form', function (req, res) {
    res.redirect('supporting-information-correction-second-hand-information');
});

router.post('/statement-of-case/unreasonable/supporting-information-correction-second-hand-information', function (req, res) {
    res.redirect('supporting-information-correction-submitted');
});

router.post('/screening-questions/result', function (req, res) {
    res.redirect('/task-list');
});

router.get('/clear-session', function (req, res) {
  req.session.destroy();
  res.redirect('back');
});


router.get('/check-application-in-progress', function (req, res) {
        res.render('new-application');
});

router.post('/check-application-in-progress', function (req, res) {
        if (req.body.hasStartedApplication == "Yes") {
            res.redirect('/IDAM/login');
        }
        else if (req.body.hasStartedApplication == "No") {
            res.redirect('/task-list');
        }
});

router.get('/check-mobile-number', function (req, res) {
        res.render('check-mobile-number', { mobileNumber: req.session.mobileNumber });
});

router.post('/check-mobile-number', function (req, res) {
    if (req.body.isCorrectNumber == "Yes") {
        // send verification code
        res.redirect('/registration-sms-verify');
    }
    else {
        // Send them back
        res.redirect('/registration');
    }
});

router.get('/save-return/enter-code', function (req, res) {
            var oneTimeSMSCode = Math.floor((Math.random() * 900000) + 100000)
            req.session.oneTimeSMSCode = oneTimeSMSCode;
            var messageText = "Your verification code is " + oneTimeSMSCode;

            var accountSid = 'ACf1911dcf9e607ef28378af0ac7013a66';
            var authToken = 'f546c0c656c00f91945040cd3cc96b1e';

            //require the Twilio module and create a REST client
            var client = require('twilio')(accountSid, authToken);

            client.messages.create({
                to: req.session.mobileNumber,
                from: '+441429450113',
                body: messageText,
            }, function (err, message) {
                console.log(message);
                console.log(err);
            });
        res.render('save-return/enter-code');
});



router.get('/save-return/goodbye/:whereTo', function (req, res) {
    req.session.isLoggedIn = "no";
    req.session.returnUri = req.params.whereTo;
    console.log("Return to: " + req.session.returnUri);
    req.session.mobileNumberVerified = null;
    res.render('save-return/goodbye');
});


router.post('/save-return/enter-code', function (req, res) {
    if (req.session.whereTo === 'check') {
        res.redirect('/save-return/check-your-answers');
    }
    else if (req.session.whereTo == "change") {
        res.redirect('/statement-of-case/unreasonable/supporting-information-correction-introduction');
    }
    else {
        res.redirect('/save-return/mobile-number-verified');
    }
});

router.post('/save-return/delete-application', function (req, res) {
    res.redirect('application-deleted');
});

router.post('/save-return/check-your-answers', function (req, res) {
    // Decide where to go next after returning via the check your answers page.
    req.session.isLoggedIn = "yes";
    req.session.mobileNumberVerified = "Yes";
        res.redirect(decodeURIComponent(req.session.returnUri));
});

router.post('/save-return/enter-mobile/:where', function (req, res) {
    req.session.mobileNumber = req.body.mobileNumber;
    req.session.emailAddress = req.body.emailAddress;
    res.redirect('/save-return/send-code');
});

router.post('/save-return/send-code', function (req, res) {
    res.redirect('/save-return/enter-code');
});

router.post('/screening-questions/temp-interstitial', function (req, res) {
    res.redirect('/screening-questions/irretrievable');
});

router.get('/save-return/enter-mobile/:where', function(req, res) {
    req.session.whereTo= req.params.where;
    if (req.session.whereTo == "check" || req.session.whereTo == "change") {
        res.render('IDAM/login');
    }
    else {
          res.redirect("/screening-questions/temp-interstitial");
    //    Above line was moved here replacing line below for testing in v14.
    //    res.render('save-return/enter-mobile');
    }
});


//router.get('/save-return/enter-mobile', function (req, res) {
//    console.log('requestrttt',req)
//    res.render('save-return/enter-mobile');
//});


router.get('/save-return/mobile-number-verified', function (req, res) {
        res.render('save-return/mobile-number-verified');
});

router.post('/save-return/mobile-number-verified', function (req, res) {
        req.session.mobileNumberVerified = "Yes";
        res.redirect('/screening-questions/irretrievable');

});
router.post('/save-return/enter-email', function (req, res) {
        req.session.emailAddress = req.body.emailAddress;
        res.redirect('/screening-questions/irretrievable');
});

router.get('/enter-email', function (req, res) {
        if (!req.session.emailAddress) {
            res.render('save-return/enter-email');
        }
        else {
            // Skip section
            res.redirect('/optional-information');
        }

});
router.post('/enter-email', function (req, res) {
        req.session.emailAddress = req.body.emailAddress;
        res.redirect('/optional-information');
});
router.get('/task-list', function (req, res) {
    /*
    req.session.divorceStatus = {
        showPetitionStartButton : "Yes"
        screeningComplete: "You are eligible",
        petitionCheck: "Waiting to be checked",
        petitionComplete: "Application Completed" };
    */
        res.render('task-list', { divorceStatus: req.session.divorceStatus });
});

router.get('/pay/how', function (req, res) {
        if (req.session.dnAmendment == "Yes") {
            res.redirect('pay-ammendment-fee');
        } else {
            res.render('pay/how.html', {} );
        }
});



router.post('/pay/pay-ammendment-fee', function (req, res) {
              res.redirect('/pay/enter-card-ammendment');
});

router.post('/pay/how', function (req, res) {
    req.session.paymentMethod = req.body.method;
              res.redirect('/pay/enter-card-2');
});

router.get('/submitted-online', function (req, res) {
    res.render('submitted-online.html', {} );
});

router.post('/pay/confirm-card-payment-2', function (req, res) {
    if ((req.session.state == "dn-stage-resp-does-not-admit-adultery") || (req.session.state == "dn-stage-resp-does-not-consent")) {
        res.redirect('/dn-stage/done');
    }
    else {
        res.redirect('/done');
    }
});

router.post('/pay/confirm-card-payment-ammendment', function (req, res) {
    if ((req.session.state == "dn-stage-resp-does-not-admit-adultery") || (req.session.state == "dn-stage-resp-does-not-consent")) {
        if (req.session.paymentSucceeded == "Yes") {
            res.redirect('/dn-stage/done');
        } else {
            req.session.paymentDeclined = "Yes";
            req.session.paymentSucceeded = "Yes";
            res.redirect('/pay/pay-ammendment-fee');
        }
    }
    else {
        res.redirect('/dn-stage/done');
    }
});

router.post('/pay/confirm-card-payment-bailiff', function (req, res) {
    if ((req.session.state == "dn-stage-resp-does-not-admit-adultery") || (req.session.state == "dn-stage-resp-does-not-consent")) {
        if (req.session.paymentSucceeded == "Yes") {
            res.redirect('/bailiff/done');
        } else {
            req.session.paymentDeclined = "Yes";
            req.session.paymentSucceeded = "Yes";
            res.redirect('/bailiff/pay-bailiff-fee');
        }
    }
    else {
        res.redirect('/bailiff/done');
    }
});

router.post('/submitted-online', function (req, res) {
    req.session.divorceStatus.screeningComplete = "Yes";
    req.session.divorceStatus.petitionComplete = "Yes";
    req.session.divorceStatus.nextStep = "Pay for the divorce application";
    req.session.divorceStatus.nextStepURL = "#pay-online";
    res.redirect('/task-list');
});


router.post('/screening-questions/husband-or-wife', function (req, res) {

  req.session.divorceWho = req.body.divorceWho;

  res.redirect('marriage-date');
});

router.post('/screening-questions/in-the-uk', function (req, res) {
  if (req.body.whereMarried == "yes"){
      req.session.certificate.whereMarried = "UK";
      res.redirect('../jurisdiction/habitual-residence-concept');
  }
  else if (req.body.whereMarried == "no") {
      req.session.certificate.whereMarried = "Outside UK";
      res.redirect('/about-your-marriage/about-your-marriage-certificate');
  }
});

router.post('/about-your-marriage/about-your-marriage-certificate', function (req, res) {
      req.session.certificate.inEnglish = req.body.marriageCertInEnglish;
      req.session.certificate.hasCertifiedTranslation = req.body.hasCertifiedTranslation;
      if (req.session.certificate.inEnglish == "Yes") {
          res.redirect('/about-your-marriage/foreign-certificate');
      }
      else {
          if (req.session.certificate.hasCertifiedTranslation == "Yes") {
              res.redirect('/about-your-marriage/foreign-certificate');
          } else {
              res.redirect('/exit/about-your-marriage/no-certificate-translated.html');
          }
      }
});

router.post('/about-your-marriage/foreign-certificate', function (req, res) {
      req.session.certificate.placeOfMarriage = req.body.placeOfMarriage;
      req.session.certificate.countryOfMarriage = req.body.countryOfMarriage;
      res.redirect('../jurisdiction/habitual-residence-concept');
});

router.get('/screening-questions/has-printer', function (req, res) {
  res.render('screening-questions/has-printer.html', {});
});


router.post('/screening-questions/has-printer', function (req, res) {
  var hasPrinter = req.body.hasPrinter;
  req.session.hasPrinter = hasPrinter;

  if (hasPrinter === 'No') {
    res.redirect('../exit/screening-questions/no-printer');
  } else {
    res.redirect('/screening-questions/husband-or-wife');
  }
});




// router.post('/screening-questions/irretrievable', function (req, res) {
//   //if no then exit.
//   req.session.irretrievableBreakdown == req.body.irretrievableBreakdown;
//   res.redirect('/screening-questions/respondent-address');
// });





router.post('/screening-questions/irretrievable', function (req, res) {
  var irretrievableBreakdown = req.body.irretrievableBreakdown;
  req.session.irretrievableBreakdown = irretrievableBreakdown;

  if (irretrievableBreakdown === 'No') {
    res.redirect('../exit/screening-questions/not-irretrievable');
  } else {
    res.redirect('/screening-questions/respondent-address');
  }
});

router.get('/screening-questions/in-a-church', function (req, res) {
  var englandOrWales = req.session.certificate.whereMarried === 'wales' ? 'Anglican Church in Wales' : 'Anglican Church of England';
  res.render('screening-questions/in-a-church.html', {englandOrWales: englandOrWales});
});

router.get('/financials-advice', function (req, res) {
    res.render('financials-advice');
});

router.post('/financials-advice', function (req, res) {
        res.redirect('/claim-costs');
});

router.post('/financial-arrangements', function (req, res) {
    if (req.body.financialOrder == "Yes-later" || req.body.financialOrder == "Yes-after"){
        req.session.financialOrder = req.body.financialOrder;
        req.session.financialOrderForPetitioner = req.body.financialOrderForPetitioner;
        req.session.financialOrderForChildren = req.body.financialOrderForChildren;
        console.log(req.session.financialOrder);
        res.redirect('/financials-advice');
    }
    else {
        req.session.financialOrder = req.body.financialOrder;
        res.redirect('/claim-costs');
    }
});


// router.post('/5-yr-financials', function (req, res) {
//         req.session.fiveYearFinancialSupport = req.body.financialSupport;
//         res.redirect('/claim-costs');
// });

router.get('/optional-information', function (req, res) {
    res.render('optional-information');
});

router.post('/optional-information', function (req, res) {
    if (req.body.hasChildren == "Yes"){
        res.redirect('/children');
    }
    else{
        res.redirect('/upload-docs/documents');
    }
});

router.post('/choose-divorce-centre', function (req, res) {
    req.session.divorceCentre = req.body.divorceCentre;
    res.redirect('/upload-docs/documents');
});

router.post('/upload-docs/documents', function (req, res) {
        res.redirect('https://hmcts-pcq-div-prototype.herokuapp.com/pcq-v1/introduction');
});

router.post('/upload-docs/unable-to-upload', function (req, res) {
    res.redirect('https://hmcts-pcq-div-prototype.herokuapp.com/pcq-v1/introduction');
});

router.get('/children', function (req, res) {
    res.render('children');
});

router.post('/children', function (req, res) {
    req.session.numberChildrenOver = req.body.numberChildrenOver;
    req.session.numberChildrenUnder = req.body.numberChildrenUnder;
    res.redirect('/children2');
});

router.get('/children2', function (req, res) {
    res.render('children2');
});

router.post('/children2', function (req, res) {
    res.redirect('/upload-docs/documents');
});

router.post('/screening-questions/help-with-fees', function (req, res) {
    if (req.body.wantsHelpWithFees == "Yes") {
        req.session.wantsHelpWithFees = "Yes";
        res.redirect('/screening-questions/help-with-fees-payment');
    }
    else {
        req.session.wantsHelpWithFees = "No";
        if (req.session.dnAmendment == "Yes") {
            res.redirect('/reason-for-divorce');
        } else {
            res.redirect('/screening-questions/husband-or-wife');
        }
    }

});

router.post('/screening-questions/financial-remedy', function (req, res) {
        req.session.noSaveAndReturn = "No"; //Turn save and return back on, it's been off for the screeners.
        res.redirect('/IDAM/login?continue_url=/contact-details');

});

router.get('/screening-questions/help-with-fees-payment', function (req, res) {
    res.render('screening-questions/help-with-fees-payment');
});

router.post('/screening-questions/help-with-fees-payment', function (req, res) {
    req.session.helpWithFeesHasRef = req.body.helpWithFeesHasRef;
    req.session.helpWithFeesReference = req.body.helpWithFeesReference;
    if (req.session.helpWithFeesHasRef == "No") {
        res.redirect('/exit/screening-questions/no-help-with-fees-reference-number.html');
    } else {
        if (req.session.dnAmendment == "Yes") {
            res.redirect('/reason-for-divorce');
        } else {
            res.redirect('/screening-questions/husband-or-wife');
        }
    }
});

router.post('/screening-questions/in-a-church', function (req, res) {
  req.session.certificate.church = req.body.inChurch;
  res.redirect('/about-your-marriage/where');
});

router.post('/screening-questions/marriage-cert-translated', function (req, res) {
  var isTranslated = req.body.isTranslated;
  req.session.certificate.isTransalted = isTranslated;

  if (isTranslated === 'No') {
    res.redirect('../exit/screening-questions/no-certificate-translated');
  } else {
    res.redirect('../about-your-marriage/foreign-certificate');
  }
});

router.post('/about-you/address/enter-manually', function (req, res) {

  req.session.petitioner.home.street1 = req.body.street1;
  req.session.petitioner.home.street2 = req.body.street2;
  req.session.petitioner.home.street3 = req.body.street3;
  req.session.petitioner.home.town = req.body.town;
  req.session.petitioner.home.county = req.body.county;
  req.session.petitioner.home.postcode = req.body.postcode;

  req.session.petitioner.address = [
    req.body.street1,
    req.body.street2,
    req.body.street3,
    req.body.town,
    req.body.county
  ].filter(function (val) {
    return val;
  }).join(', ');

  res.redirect('../correspondence');
});


router.post('/about-you/correspondence-address/enter-manually', function (req, res) {

  req.session.petitioner.correspondence.street1 = req.body.street1;
  req.session.petitioner.correspondence.street2 = req.body.street2;
  req.session.petitioner.correspondence.street3 = req.body.street3;
  req.session.petitioner.correspondence.town = req.body.town;
  req.session.petitioner.correspondence.county = req.body.county;
  req.session.petitioner.correspondence.postcode = req.body.postcode;

  req.session.petitioner.correspondence.address = [
    req.body.street1,
    req.body.street2,
    req.body.street3,
    req.body.town,
    req.body.county
  ].filter(function (val) {
    return val;
  }).join(', ');

  res.redirect('/respondent/correspondence-live-together');
});

router.get('/about-you/correspondence-address/postcode', function (req, res) {
  var title = 'Where do you want your divorce papers sent?';
  var postcode = req.session.petitioner.correspondence.postcode;
  addressLookup.fakeLookup(
  postcode,
  function (addresses) {
    res.render(
    'common/address/postcode', {
      postcode: postcode,
      title: title,
      outsideUKText: 'My address is outside the UK',
      addresses: addresses,
      address: req.session.petitioner.correspondence
    }
    );
  }
  );
});

router.post('/about-you/correspondence-address/postcode', function (req, res) {
  req.session.petitioner.correspondence.street1 = req.body.street1;
  req.session.petitioner.correspondence.street2 = req.body.street2;
  req.session.petitioner.correspondence.street3 = req.body.street3;
  req.session.petitioner.correspondence.town = req.body.town;
  req.session.petitioner.correspondence.county = req.body.county;
  req.session.petitioner.correspondence.postcode = req.body.postcode;

  res.redirect('/live-together');
});

router.post('/about-you/confidential', function (req, res) {
  req.session.petitioner.confidential = req.body.confidential;
  res.redirect('your-current-name');
});

router.post('/feedback', function (req, res) {
  res.redirect('/feedback-thanks');
});

router.post('/about-you/your-current-name', function (req, res) {
  req.session.petCurrentFirstName = req.body.petCurrentFirstName;
  req.session.petCurrentLastName = req.body.petCurrentLastName;
  req.session.petNameSameAsCert = req.body.petNameSameAsCert;
  req.session.petMarriageCertFirstName = req.body.petMarriageCertFirstName;
  req.session.petMarriageCertLastName = req.body.petMarriageCertLastName;
  res.redirect('/about-your-marriage/where');
});



router.get('/respondent/correspondence', function (req, res) {
    if (req.session.liveTogether == "Yes") {
        res.redirect('correspondence-live-together');
    } else {
        res.redirect('correspondence-live-apart');
    }
});

router.post('/respondent/correspondence-live-together', function (req, res) {
    req.session.respondent.usePetitionerAddressForService = req.body.usePetitionerAddressForService;
    if (req.session.respondent.usePetitionerAddressForService == "noSolicitor") {
        res.redirect('solicitor-details');
    } else if (req.session.respondent.usePetitionerAddressForService == "noOther") {
        res.redirect('/respondent/correspondence-address/postcode'); // Same one as before.
    } else if (req.session.respondent.usePetitionerAddressForService == "Yes") {
        req.session.respondent.correspondence = req.session.petitioner.correspondence;
        res.redirect('/reason-for-divorce');
    }
});

router.post('/respondent/correspondence-live-apart', function (req, res) {
    req.session.respondent.usePetitionerAddressForService = req.body.usePetitionerAddressForService;
    if (req.session.respondent.usePetitionerAddressForService == "noSolicitor") {
        res.redirect('solicitor-details');
    } else if (req.session.respondent.usePetitionerAddressForService == "noOther") {
        res.redirect('correspondence-address/postcode'); // Same one as before.
    }
});

router.post('/respondent/solicitor-details', function (req, res) {
    req.session.respondent.solicitorName = req.body.solicitorName;
    req.session.respondent.solicitorFirm = req.body.solicitorFirm;
    res.redirect('solicitor-address'); //placeholder routing till the below line has been built.
    //res.redirect('/correspondence-address-solicitor'); // Copy any address route.
});

router.get('/respondent/correspondence-address/postcode', function (req, res) {
  var title = 'Where should your ' + res.locals.husbandOrWife() + '\'s divorce papers be sent?';
  var postcode = req.session.respondent.correspondence.postcode;




  var instructionText = 'You must provide either a residential address or your '+ res.locals.husbandOrWife() +'\'s solicitor\'s address. This can be a UK or international address.';
  var instructionText2 =   'The court needs this so that it can send your '+ res.locals.husbandOrWife() +' their divorce papers.';

  addressLookup.fakeLookup(
  postcode,
  function (addresses) {
    res.render(
    'common/address/postcode', {
      postcode: postcode,
      title: title,
      instructionText: instructionText,
      instructionText2: instructionText2,
      outsideUKText: 'My '+ res.locals.husbandOrWife() +'’s address is outside the UK',
      addresses: addresses,
      address: req.session.respondent.correspondence
    }
    );
  }
  );
});

router.post('/respondent/correspondence-address/postcode', function (req, res) {
  req.session.respondent.correspondence.street1 = req.body.street1;
  req.session.respondent.correspondence.street2 = req.body.street2;
  req.session.respondent.correspondence.street3 = req.body.street3;
  req.session.respondent.correspondence.town = req.body.town;
  req.session.respondent.correspondence.county = req.body.county;
  req.session.respondent.correspondence.postcode = req.body.postcode;

  if (req.session.mode == "dnStage") {
      res.redirect("/dn-stage/done");
  } else {
      res.redirect('/reason-for-divorce');
  }
});

router.post('/respondent/correspondence-address/enter-manually', function (req, res) {

  req.session.respondent.correspondence.street1 = req.body.street1;
  req.session.respondent.correspondence.street2 = req.body.street2;
  req.session.respondent.correspondence.street3 = req.body.street3;
  req.session.respondent.correspondence.town = req.body.town;
  req.session.respondent.correspondence.county = req.body.county;
  req.session.respondent.correspondence.postcode = req.body.postcode;

  req.session.respondent.correspondence.address = [
    req.body.street1,
    req.body.street2,
    req.body.street3,
    req.body.town,
    req.body.county
  ].filter(function (val) {
    return val;
  }).join(', ');

  res.redirect('/reason-for-divorce');
});

router.post('/respondent/home-address', function (req, res) {
  req.session.respondent.homeAddress = req.body.homeAddress;
  req.session.respondent.provideHomeAddress = req.body.provideHomeAddress;

  if (req.session.respondent.homeAddress === 'No' && req.session.respondent.provideHomeAddress === 'Yes') {
    res.redirect('address/postcode');
  } else {
    separationOrReason(req, res);
  }
});


router.post('/respondent/address/enter-manually', function (req, res) {

  req.session.respondent.home.street1 = req.body.street1;
  req.session.respondent.home.street2 = req.body.street2;
  req.session.respondent.home.street3 = req.body.street3;
  req.session.respondent.home.town = req.body.town;
  req.session.respondent.home.county = req.body.county;
  req.session.respondent.home.postcode = req.body.postcode;

  req.session.respondent.home.address = [
    req.body.street1,
    req.body.street2,
    req.body.street3,
    req.body.town,
    req.body.county
  ].filter(function (val) {
    return val;
  }).join(', ');

    res.redirect('../correspondence');
});

router.post('/respondent/home-address', function (req, res) {
  req.session.respondent.homeAddress = req.body.homeAddress;

  if (req.session.respondent.homeAddress === 'No') {
    res.redirect('address/postcode');
  } else {
    res.redirect('../reason-for-divorce');
  }
});

router.post('/about-your-marriage/where', function (req, res) {
  var inThe2 = req.body.inThe2;
  var of2='';

  switch (inThe2) {
    case 'County': of2 = req.body.county;
      break;
    case 'London Borough': of2 = req.body.londonBorough;
      break;
    case 'Metropolitan Borough': of2 = req.body.metropolitanBorough;
      break;
    case 'Metropolitan District': of2 = req.body.metropolitanDistrict;
      break;
    case 'Royal Borough': of2 = req.body.royalBorough;
      break;
    default : of2 = req.body.of2;
  }

  req.session.certificate.placeOfMarriage = {
    venue: req.body.solemnizedAt,
    inThe1: req.body.inThe1,
    of1: req.body.of1,
    inThe2: inThe2,
    of2: of2,
    other: req.body.other
  };
  req.session.certificate.parishOrDistrict = req.body.parishOrDistrict;
  req.session.certificate.FirstName = req.body.certificateFirstName;
  req.session.certificate.LastName = req.body.certificateLastName;
  req.session.certificate.RespFirstName = req.body.respCertificateFirstName;
  req.session.certificate.RespLastName = req.body.respCertificateLastName;
  res.redirect('/about-your-marriage/have-you-changed-your-name');
});

// router.post('/about-your-marriage/have-you-changed-your-name', function (req, res) {
//     req.session.petitonerHasChangedName = req.body.petitionerHasChangedName;
//     if (req.session.petitonerHasChangedName === "No") {
//         res.redirect('/about-you/email-address');
//     }
//     else {
//         res.redirect('how-did-you-change-your-name');
//     }
// });

router.post('/about-your-marriage/have-you-changed-your-name', function (req, res) {
    req.session.petitionerHasChangedName = req.body.petitionerHasChangedName; //either Yes or No
    req.session.nameChangeMethod = req.body.nameChangeMethod; // either marriageCert, deedPollOrStatutoryDeclaration or Other
    res.redirect('/about-you/address/postcode');
});

router.post('/contact-details', function (req, res) {
    res.redirect('/screening-questions/help-with-fees');
});

router.post('/about-your-marriage/confirm', function (req, res) {
  if(req.body.confirm){
    res.redirect('../about-you/details');
  } else {
    res.redirect('confirm');
  }
});


router.get('/reason-for-divorce', function (req, res) {
    if (!req.session.MarriageDate) {
        // For testing, default view
        req.session.MarriageDate = { day: '01', month: '09', year: '2001' };
    }
  var twoYearsAgo = moment().subtract(2, 'year').subtract(1, 'days');
  var fiveYearsAgo = moment().subtract(5, 'year').subtract(1, 'days');

  /*
   *
   * For Testing only
   *
  function marriageDate() {
         var MarriageDate = { day: '01', month: '09', year: '2015' };
         return MarriageDate.day + '/' + MarriageDate.month + '/' + MarriageDate.year;
  }
  */

  function marriageDate() {
     if (req.session.MarriageDate) {
         return req.session.MarriageDate.day + '/' + req.session.MarriageDate.month + '/' + req.session.MarriageDate.year;
     }
  }

  var showTwoYearsSeparation = moment(marriageDate(), 'DD/MM/YYYY').isBefore(twoYearsAgo);

  var showFiveYearsSeparation = moment(marriageDate(), 'DD/MM/YYYY').isBefore(fiveYearsAgo);

  var twoYearsFromMarriage = moment(marriageDate(), 'DD/MM/YYYY').add(2, 'years').format('DD MMMM YYYY');
  var fiveYearsFromMarriage = moment(marriageDate(), 'DD/MM/YYYY').add(5, 'years').format('DD MMMM YYYY');

  if (showTwoYearsSeparation) {
      dateReasonsAvailable = fiveYearsFromMarriage;
  }
  else if (showFiveYearsSeparation) {
      dateReasonsAvailable = fiveYearsFromMarriage;
  }
  else if (!showFiveYearsSeparation && !showTwoYearsSeparation) {
      dateReasonsAvailable = twoYearsFromMarriage;
  }


  switch (req.query.case) {
      case "2":
            showTwoYearsSeparation = 1;
            showFiveYearsSeparation = 0;
            showDesertion = 1;
            dateReasonsAvailable = twoYearsFromMarriage;
          break;
      case "5":
            showTwoYearsSeparation = 0;
            showFiveYearsSeparation = 1;
            showDesertion = 1;
            dateReasonsAvailable = fiveYearsFromMarriage;
          break;
      default:
            showDesertion = 1;
          break
  }
  res.render('reason-for-divorce', {
    showTwoYearsSeparation: showTwoYearsSeparation,
    showFiveYearsSeparation: showFiveYearsSeparation,
    showDesertion: showTwoYearsSeparation, //use 2-year separation rule for desertion
    dateReasonsAvailable: dateReasonsAvailable,
    twoYearsFromMarriage: twoYearsFromMarriage,
    fiveYearsFromMarriage: fiveYearsFromMarriage
  });
});


router.post('/reason-for-divorce', function (req, res) {
  var reason = req.body.reason;
  req.session.facts.reason = reason;
console.log(req.session.facts.reason);
  switch (reason) {
    case 'desertion':
      res.redirect('statement-of-case/desertion/agree');
      break;
    case 'separation-2-years':
      res.redirect('statement-of-case/separation/respondent-consent');
      break;
    case 'separation-5-years':
      res.redirect('/statement-of-case/separation/when-did-you-separate');
      break;
    case 'adultery':
      res.redirect('/statement-of-case/adultery/wish-to-name');
      break;
    case 'unreasonable-behaviour':
      res.redirect('statement-of-case/unreasonable/supporting-information');
      break;
    default:
      res.redirect('/reason-for-divorce');
  }

});

router.post('/statement-of-case/adultery/when-and-where', function (req, res) {
    req.session.adultery.knowWhen = req.body.knowWhen;
  req.session.adultery.knowWhere = req.body.knowWhere;
  res.redirect('account');
});


// REMOVED THE FOLLLOWING DUE TO CHANGE IN DN SCOPE
// router.post('/statement-of-case/adultery/lived-apart-since', function (req, res) {
//     res.redirect('/statement-of-case/adultery/wish-to-name');
// });

router.post('/statement-of-case/adultery/wish-to-name', function (req, res) {
  var wishToName = req.body.wishToName;
  req.session.adultery.wishToName = wishToName;

  if (wishToName === 'Yes') {
    req.session.adultery.corespondent.firstName = req.body.firstName;
    req.session.adultery.corespondent.lastName = req.body.lastName;
    res.redirect('co-respondent-address');
  } else {
    res.redirect('/statement-of-case/adultery/when-and-where');
  }
});

router.post('/statement-of-case/adultery/lived-together', function (req, res) {
  var livedTogether = req.body.livedTogether;
  var moreThan6Months = req.body.moreThan6Months;
  req.session.adultery.livedTogether = livedTogether;
  req.session.adultery.moreThan6Months = moreThan6Months;

  if (livedTogether === 'Yes' && moreThan6Months === 'Yes') {
    res.redirect('../../exit/statement-of-case/six-month-period');
  } else {
    res.redirect('account');
  }
});

router.post('/statement-of-case/adultery/account', function (req, res) {
  req.session.adultery.adulteryDetails = req.body.adulteryDetails;
  res.redirect('second-hand-information');
});

router.post('/statement-of-case/adultery/second-hand-information', function (req, res) {
  res.redirect('../../reason-and-soc-complete');
});

router.post('/statement-of-case/adultery/co-respondent-address', function (req, res) {

  req.session.adultery.corespondent.street1 = req.body.street1;
  req.session.adultery.corespondent.street2 = req.body.street2;
  req.session.adultery.corespondent.street3 = req.body.street3;
  req.session.adultery.corespondent.town = req.body.town;
  req.session.adultery.corespondent.county = req.body.county;
  req.session.adultery.corespondent.postcode = req.body.postcode;
  res.redirect('/statement-of-case/adultery/when-and-where');
});

router.get('/statement-of-case/adultery/co-respondent-address', function (req, res) {
  var postcode = req.session.adultery.corespondent.postcode;

  addressLookup.fakeLookup(
  postcode,
  function (addresses) {
    res.render(
    'statement-of-case/adultery/name-person', {
      postcode: postcode,
      addresses: addresses,
      address: req.session.adultery.corespondent
    }
    );
  }
  );
});

router.post('/statement-of-case/adultery/enter-manually', function (req, res) {
  req.session.adultery.corespondent.street1 = req.body.street1;
  req.session.adultery.corespondent.street2 = req.body.street2;
  req.session.adultery.corespondent.street3 = req.body.street3;
  req.session.adultery.corespondent.town = req.body.town;
  req.session.adultery.corespondent.county = req.body.county;
  req.session.adultery.corespondent.postcode = req.body.postcode;

  req.session.adultery.corespondent.address = [
    req.body.street1,
    req.body.street2,
    req.body.street3,
    req.body.town,
    req.body.county
  ].filter(function (val) {
    return val;
  }).join(', ');

  res.redirect('evidence');
});

router.get('/about-you/address/postcode', function (req, res) {
  var title = 'What is your current address?';
  var postcode = req.session.petitioner.home.postcode;

  addressLookup.fakeLookup(
  postcode,
  function (addresses) {
    res.render(
    'common/address/postcode', {
      postcode: postcode,
      instructionText: 'This must be a residential address. You must tell the court if you change your address during your divorce.',
      title: title,
      outsideUKText: 'My address is outside the UK',
      addresses: addresses,
      address: req.session.petitioner.home,
      selectLabel: 'Select your address'
    }
    );
  }
  );
});

router.post('/about-you/address/postcode', function (req, res) {
  req.session.petitioner.home.street1 = req.body.street1;
  req.session.petitioner.home.street2 = req.body.street2;
  req.session.petitioner.home.street3 = req.body.street3;
  req.session.petitioner.home.town = req.body.town;
  req.session.petitioner.home.county = req.body.county;
  req.session.petitioner.home.postcode = req.body.postcode;

  res.redirect('../correspondence');
});


router.get('/about-you/address/enter-manually', function (req, res) {
  var title = 'What is your current address?';
  res.render(
  'common/address/enter-manually', {
    title: title,
    address: req.session.petitioner.home
  }
  );
});

router.post('/about-you/correspondence', function (req, res) {
    if (req.body.useAddress == 'Yes') {
        res.redirect('/live-together');
    }
    else
    {
        res.redirect('correspondence-address/postcode'); //about-you
    }
});

router.post('/about-you/last-lived-together-at-petitioner-address', function (req, res) {
    req.session.whereLastLivedTogether = req.body.whereLastLivedTogether;
    if (req.body.whereLastLivedTogether == "Petitioner") {
    //set whereLastLivedTogetherAddress = petitioner address
        req.session.whereLastLivedTogetherAddress = req.session.petitioner.home;
        res.redirect('/respondent/address/has-home-address');
    }
    if (req.body.whereLastLivedTogether == "Other") {
    // if OTHER then address lookup and save result in whereLivedTogether
        res.redirect('/about-you/where-last-lived-together');
    }
    if (req.body.whereLastLivedTogether == "Never") {
    // if OTHER then address lookup and save result in whereLivedTogether
        res.redirect('/respondent/address/postcode');
    }
});

router.post('/respondent/address/doyouknow', function (req, res) {
        req.session.respondent.knowWhere = req.body.knowWhere;
        if (req.session.respondent.knowWhere == "Yes") {
            res.redirect('/respondent/address/postcode');
        } else {
            if (req.session.liveTogether == "Yes") {
                res.redirect('/respondent/correspondence-live-together');
            } else {
                res.redirect('/respondent/correspondence-live-apart');
            }
        }
        });

router.get('/about-you/where-last-lived-together', function (req, res) {
  var title = 'Where did you last live together?';
  var postcode = req.session.whereLastLivedTogetherAddress.postcode;

  addressLookup.fakeLookup(
  postcode,
  function (addresses) {
    res.render(
    'common/address/postcode', {
      postcode: postcode,
      title: title,
      outsideUKText: 'My address is outside the UK',
      addresses: addresses,
      address: req.session.whereLastLivedTogetherAddress,
      selectLabel: 'Select your address'
    }
    );
  }
  );
});

router.get('/respondent/solicitor-address', function (req, res) {
  var title = 'What is the address of your ' + res.locals.husbandOrWife() + '\'s solicitor?';
  req.session.respSolicitorAddress = req.session.petitioner.home;
  var postcode = req.session.respSolicitorAddress.postcode;
  console.log(postcode);

  addressLookup.fakeLookup(
  postcode,
  function (addresses) {
    res.render(
    'common/address/postcode', {
      postcode: postcode,
      title: title,
      outsideUKText: 'My address is outside the UK',
      addresses: addresses,
      address: req.session.respSolicitorAddress,
      selectLabel: 'Select your address'
    }
    );
  }
  );
});

router.post('/respondent/solicitor-address', function (req, res) {
  req.session.respSolicitorAddress.street1 = req.body.street1;
  req.session.respSolicitorAddress.street2 = req.body.street2;
  req.session.respSolicitorAddress.street3 = req.body.street3;
  req.session.respSolicitorAddress.town = req.body.town;
  req.session.respSolicitorAddress.county = req.body.county;
  req.session.respSolicitorAddress.postcode = req.body.postcode;
console.log(req.session.respSolicitorAddress);
  res.redirect('/reason-for-divorce');
});

router.post('/about-you/where-last-lived-together', function (req, res) {
  req.session.whereLastLivedTogetherAddress.street1 = req.body.street1;
  req.session.whereLastLivedTogetherAddress.street2 = req.body.street2;
  req.session.whereLastLivedTogetherAddress.street3 = req.body.street3;
  req.session.whereLastLivedTogetherAddress.town = req.body.town;
  req.session.whereLastLivedTogetherAddress.county = req.body.county;
  req.session.whereLastLivedTogetherAddress.postcode = req.body.postcode;

  res.redirect('/about-you/resp-lives-at-last-lived-together-address');
});

router.post('/about-you/resp-lives-at-last-lived-together-address', function (req, res) {
    req.session.respondent.respLivesAtLastLivedTogetherAddress = req.body.respLivesAtLastLivedTogetherAddress;
    if (req.body.respLivesAtLastLivedTogetherAddress == "No") {
        res.redirect('/respondent/address/has-home-address');
    }
    else if (req.body.respLivesAtLastLivedTogetherAddress == "Yes") {
        req.session.respondent.home = req.session.whereLastLivedTogetherAddress;
        res.redirect('/respondent/correspondence-live-together');
    }
    else if (req.body.respLivesAtLastLivedTogetherAddress == "Unknown") {
        res.redirect('/respondent/correspondence-live-apart');
    }

});

router.get('/about-you/correspondence-address/enter-manually', function (req, res) {
  var title = 'Where do you want your divorce papers sent?';
  res.render(
  'common/address/enter-manually', {
    title: title,
    address: req.session.petitioner.correspondence
  }
  );
});


router.get('/respondent/correspondence-address/enter-manually', function (req, res) {
  var title = 'Where should your ' + res.locals.husbandOrWife() + '\'s divorce papers be sent?';
  var label = 'The court will need this so it can send your '+ res.locals.husbandOrWife() +' their divorce papers. ' +
    'This doesn’t have to be their home address, and can be anywhere where they can receive mail.';
  res.render(
  'common/address/enter-manually', {
    title: title,
    label: label,
    address: req.session.respondent.correspondence
  }
  );
});

router.get('/respondent/address/postcode', function (req, res) {
  var title = 'What is your ' + res.locals.husbandOrWife() + '\'s home address?';
  var postcode = req.session.respondent.home.postcode;
  addressLookup.fakeLookup(
  postcode,
  function (addresses) {
    res.render(
    'common/address/postcode', {
      postcode: postcode,
      title: title,
      instructionText: 'This must be a residential address.',
      outsideUKText: 'My '+ res.locals.husbandOrWife() +'’s address is outside the UK',
      addresses: addresses,
      address: req.session.respondent.home
    }
    );
  }
  );
});

router.post('/respondent/address/has-home-address', function (req, res) {
    if (req.body.knowWhere == "Yes") {
        res.redirect('/respondent/address/postcode');
    }
    else if (req.body.knowWhere == "No") {
        res.redirect('/respondent/correspondence-live-apart');
    }
});

router.post('/respondent/address/postcode', function (req, res) {
  req.session.respondent.home.street1 = req.body.street1;
  req.session.respondent.home.street2 = req.body.street2;
  req.session.respondent.home.street3 = req.body.street3;
  req.session.respondent.home.town = req.body.town;
  req.session.respondent.home.county = req.body.county;
  req.session.respondent.home.postcode = req.body.postcode;

  res.redirect('/respondent/correspondence-live-together');
});

router.get('/respondent/address/enter-manually', function (req, res) {
  var title = 'Your ' + res.locals.husbandOrWife() + '\'s home address';
  res.render(
  'common/address/enter-manually', {
    title: title,
    address: req.session.respondent.home
  }
  );
});

router.get('/legal-proceedings', function(req, res) {
    res.render('legal-proceedings.html');
});

router.post('/legal-proceedings', function(req, res) {

  var legalProceedings = req.body.legalProceedings;
      req.session.legalProceedings = req.body.legalProceedings;
      res.redirect('financial-arrangements');

});

router.get('/live-together', function(req, res) {
    res.render('live-together.html');
});

router.post('/live-together', function(req, res) {

  var liveTogether = req.body.liveTogether;
  if (liveTogether == 'Yes') {
      req.session.liveTogether = 'Yes';
      req.session.respondent.home = req.session.petitioner.home;
      res.redirect('/respondent/correspondence-live-together');
  }
  else
  {
      req.session.livetogether = 'No';
      res.redirect('/about-you/last-lived-together-at-petitioner-address');
  }

});

router.get('/live-together-separated', function(req, res) {
    res.render('live-together-separated.html', {});
});

router.post('/live-together-separated', function(req, res) {
  var liveTogetherSeparated = req.body.liveTogetherSeparated;
  console.log(liveTogetherSeparated);
  if (liveTogetherSeparated == 'Yes') {
      req.session.liveTogetherSeparated = 'Yes';
      res.redirect('respondent/details');
  }
  else
  {
      req.session.liveTogetherSeparated = 'No';
      res.redirect('respondent/details');
  }
});

router.get('/download', function (req, res) {
    res.render('download.html', {} );
});

router.post('/download', function (req, res) {
    res.redirect('/downloaded');
});

router.get('/downloaded', function (req, res) {
    res.render('downloaded.html', {} );
});

router.post('/downloaded', function (req, res) {
    res.redirect('/done');
});
router.get('/respondent/details', function (req, res) {
    res.render('respondent/details', {
        respFirstName: req.session.certificate.RespFirstName,
        respLastName: req.session.certificate.RespLastName
    });
});


router.post('/respondent/details', function (req, res) {
  req.session.respCurrentFirstName = req.body.respCurrentFirstName;
  req.session.respCurrentLastName = req.body.respCurrentLastName;
  req.session.respNameSameAsCert = req.body.respNameSameAsCert;
  req.session.respMarriageCertFirstName = req.body.respMarriageCertFirstName;
  req.session.respMarriageCertLastName = req.body.respMarriageCertLastName;
    res.redirect('/respondent/correspondence-live-together');
});

router.get('/about-you/details', function (req, res) {
    res.render('about-you/details', {
        certificateFirstName: req.session.certificate.FirstName,
        certificateLastName: req.session.certificate.LastName
    });
});


router.post('/about-you/details', function (req, res) {
    if (req.body.petNameSameAsCert == "No"){
        req.session.petNameSameAsCert = "No";
        req.session.currentFirstName = req.body.currentFirstName;
        req.session.currentLastName = req.body.currentLastName;
    }
    res.redirect('address/postcode');
});

router.get('/about-you/address/abroad', function (req, res) {
  res.render(
  'common/address/enter-abroad', {
    title: 'What is your current address?'
  }
  );
});
router.get('/about-you/correspondence-address/abroad', function (req, res) {
  res.render(
  'common/address/enter-abroad', {
    title: 'Where do you want your divorce papers sent?'
  }
  );
});
router.get('/respondent/correspondence-address/abroad', function (req, res) {
  res.render(
  'common/address/enter-abroad', {
    title: 'Where should your ' + res.locals.husbandOrWife() + '\'s divorce papers be sent?',
    label: 'The court will send a copy of your divorce application to your ' + res.locals.husbandOrWife()
  }
  );
});

router.post('/respondent/correspondence-address/abroad', function (req, res) {
  res.redirect('/reason-for-divorce');
});

router.post('/respondent/home-address', function (req, res) {
  req.session.respondent.homeAddress = req.body.homeAddress;

  if (req.session.respondent.homeAddress === 'No') {
    res.redirect('address/postcode');
  } else {
    res.redirect('../reason-for-divorce');
  }
});

router.get('/respondent/address/abroad', function (req, res) {
  res.render(
  'common/address/enter-abroad', {
    title: 'Your ' + res.locals.husbandOrWife() + '\'s home address'
  }
  );
});
router.get('/statement-of-case/adultery/abroad', function (req, res) {
  res.render(
  'common/address/enter-abroad', {
    title: 'Address for the person with whom the adultery was committed',
    label: 'The court will send a copy of this application form to this address'
  }
  );
});

router.post('/about-you/address/abroad', function (req, res) {
  res.redirect('../correspondence');
});

router.post('/about-you/correspondence-address/abroad', function (req, res) {
  res.redirect('/respondent/correspondence-live-together');
});


router.post('/respondent/address/abroad', function (req, res) {
  res.redirect('../correspondence');
});

router.post('/statement-of-case/adultery/abroad', function (req, res) {
  res.redirect('second-hand-information');
});



router.get('/reason-and-soc-complete', function (req, res) {
    if (req.session.dnAmendmentLegalAdvisor == "Yes") {
        res.redirect('/dn-stage/change-your-answers');
    }
    else if (req.session.dnAmendment == "Yes") {
        res.redirect('/check-your-answers');
    }
    else {
        res.redirect('legal-proceedings');
    }
});

router.get('/dn-stage/change-your-answers', function (req, res) {
    if (req.session.facts.reason === undefined) {
        req.session.facts.reason = "adultery";
    }
        res.render('dn-stage/change-your-answers');

});

router.post('/dn-stage/change-your-answers', function (req, res) {
        res.redirect('/pay/pay-ammendment-fee');
});

router.get('/statement-of-case/adultery/enter-manually', function (req, res) {
  var title = 'Address for the person with whom the adultery was committed';

  res.render(
  'common/address/enter-manually', {
    title: title,
    label: 'The court will send a copy of this application form to this address',
    address: req.session.adultery.corespondent
  }
  );
});
router.get('/statement-of-case/desertion/date', function (req, res) {
    req.session.facts.reason = 'desertion'; // Make sure it behaves if someone is demoing the desertion route and hasn't set the reason.
    res.render('statement-of-case/desertion/date');
});


router.post('/statement-of-case/desertion/date', function (req, res) {


  var desertionDate = [];
  desertionDate[0] = req.body.desertionYear;
  desertionDate[1] = req.body.desertionMonth - 1;
  desertionDate[2] = req.body.desertionDay;

    req.session.desertion.desertionDate = desertionDate;
    req.session.desertion.desertionDateFormatted = moment(desertionDate).format('DD MMMM YYYY');

    req.session.separation.mostRecentSeparationDate = moment(req.session.desertion.desertionDate);
    req.session.separation.lastPermissibleSepDate = moment().subtract(2, 'years');
    req.session.separation.periodOfInterestStartDate = moment().subtract(2, 'years').subtract(6, 'months');
    req.session.separation.potentialLiveTogetherPeriodMonths = moment(req.session.separation.lastPermissibleSepDate).diff(moment(req.session.separation.mostRecentSeparationDate), 'months');
    req.session.separation.potentialLiveTogetherPeriodWeeks = moment(req.session.separation.lastPermissibleSepDate).diff(moment(req.session.separation.mostRecentSeparationDate), 'weeks');
    req.session.separation.potentialLiveTogetherPeriodDays = moment(req.session.separation.lastPermissibleSepDate).diff(moment(req.session.separation.mostRecentSeparationDate), 'days');
    req.session.separation.potentialLiveTogetherPeriodWholeWeeks = Math.floor(req.session.separation.potentialLiveTogetherPeriodDays / 7 );
    req.session.separation.potentialLiveTogetherPeriodRemainingDays = req.session.separation.potentialLiveTogetherPeriodDays % 7 ;

    req.session.separation.mostRecentSeparationDateFormatted = moment(req.session.desertion.desertionDate).format('DD MMMM YYYY');
    req.session.separation.lastPermissibleSepDateFormatted = moment().subtract(2, 'years').format('DD MMMM YYYY');
    req.session.separation.periodOfInterestStartDateFormatted = moment().subtract(2, 'years').subtract(6, 'months').format('DD MMMM YYYY');
    // boot them out if the separation date is less than two years ago.
    if (moment().diff(moment(req.session.separation.mostRecentSeparationDate), 'years') >= 2) {
      res.redirect('../separation/lived-apart-since');
    }
    else {
        res.redirect('/exit/desertion/time-period');
    }

});

// REMOVED ALL THE FOLLOWING IN CHANGE OF SCOPE TO DN QUESTIONS MOVE

// router.post('/statement-of-case/desertion/lived-together-since', function (req, res) {
//     res.redirect('details');
// });

// REMOVED ALL THE ABOVE IN CHANGE OF SCOPE TO DN QUESTIONS MOVE


router.post('/statement-of-case/desertion/agree', function (req, res) {
  var agree = req.body.agreeOnDesertion;
  req.session.desertion.agree = agree;

  if (agree === 'Yes') {
    res.redirect('date');
  } else {
    res.redirect('../../exit/desertion/agree');
  }
});

router.post('/statement-of-case/desertion/details', function (req, res) {
  var desertionDetails = req.body.desertionDetails;
  req.session.desertion.details = desertionDetails;

  res.redirect('/reason-and-soc-complete');
});

router.post('/statement-of-case/separation/respondent-consent', function (req, res) {
  res.redirect('when-did-you-separate');
});

router.post('/statement-of-case/separation/who-decided', function (req, res) {
  req.session.whoDecided = req.body.whoDecided;
  res.redirect('when-did-you-separate');
});

router.post('/statement-of-case/separation/when-did-you-separate', function (req, res) {
  function getMostRecentDate(physical, mental) {
      var a = moment(physical);
      var b = moment(mental);
      if (a > b) {
          return physical;
      } else {
          return mental;
      }
  }

  var mentalSeparationDate = [];
  mentalSeparationDate[0] = req.body.mentalSeparationYear;
  mentalSeparationDate[1] = req.body.mentalSeparationMonth - 1;
  mentalSeparationDate[2] = req.body.mentalSeparationDay;

  var physicalSeparationDate = [];
  physicalSeparationDate[0] = req.body.physicalSeparationYear;
  physicalSeparationDate[1] = req.body.physicalSeparationMonth -1;
  physicalSeparationDate[2] = req.body.physicalSeparationDay;

    if (req.session.facts.reason == 'separation-5-years') {
        req.session.separation.constSeparationPeriod = 5;
    } else {
        req.session.separation.constSeparationPeriod = 2;
    }
console.log(req.session.separation.constSeparationPeriod);
    req.session.separation.physicalSeparationDate = physicalSeparationDate;
    req.session.separation.mentalSeparationDate = mentalSeparationDate;

    req.session.separation.physicalSeparationDateFormatted = moment(physicalSeparationDate).format('DD MMMM YYYY');
    req.session.separation.mentalSeparationDateFormatted = moment(mentalSeparationDate).format('DD MMMM YYYY');

    req.session.separation.mostRecentSeparationDate = moment(getMostRecentDate(physicalSeparationDate, mentalSeparationDate));
    req.session.separation.lastPermissibleSepDate = moment().subtract(req.session.separation.constSeparationPeriod, 'years');
    req.session.separation.periodOfInterestStartDate = moment().subtract(req.session.separation.constSeparationPeriod, 'years').subtract(6, 'months');
    req.session.separation.potentialLiveTogetherPeriodMonths = moment(req.session.separation.lastPermissibleSepDate).diff(moment(req.session.separation.mostRecentSeparationDate), 'months');
    req.session.separation.potentialLiveTogetherPeriodWeeks = moment(req.session.separation.lastPermissibleSepDate).diff(moment(req.session.separation.mostRecentSeparationDate), 'weeks');
    req.session.separation.potentialLiveTogetherPeriodDays = moment(req.session.separation.lastPermissibleSepDate).diff(moment(req.session.separation.mostRecentSeparationDate), 'days');
    req.session.separation.potentialLiveTogetherPeriodWholeWeeks = Math.floor(req.session.separation.potentialLiveTogetherPeriodDays / 7 );
    req.session.separation.potentialLiveTogetherPeriodRemainingDays = req.session.separation.potentialLiveTogetherPeriodDays % 7 ;

    req.session.separation.mostRecentSeparationDateFormatted = moment(getMostRecentDate(physicalSeparationDate, mentalSeparationDate)).format('DD MMMM YYYY');

    req.session.separation.lastPermissibleSepDateFormatted = moment().subtract(req.session.separation.constSeparationPeriod, 'years').format('DD MMMM YYYY');
    req.session.separation.periodOfInterestStartDateFormatted = moment().subtract(req.session.separation.constSeparationPeriod, 'years').subtract(6, 'months').format('DD MMMM YYYY');
    // boot them out if the separation date is less than two years ago.
    if (moment().diff(moment(req.session.separation.mostRecentSeparationDate), 'years') >= req.session.separation.constSeparationPeriod ) {
      res.redirect('lived-apart-since');
    }
    else {
        res.redirect('/exit/statement-of-case/separation-living-separately');
    }

});

router.post('/statement-of-case/separation/lived-apart-since', function (req, res) {
   req.session.separation.haveLivedApartSince = req.body.haveLivedApartSince;
   req.session.separation.haveLivedTogetherSince = req.body.haveLivedTogetherSince;

   if (req.body.haveLivedApartSince == "No") {
        if (req.body.haveLivedTogetherSince == "Yes") {
           res.redirect('/exit/statement-of-case/separation-six-month-period');
        }
       else {
           if (req.session.facts.reason == "desertion") {
               res.redirect('../desertion/details');
           } else {
               res.redirect('/reason-and-soc-complete');
           }
       }
   }
   else {
           if (req.session.facts.reason == "desertion") {
               res.redirect('../desertion/details');
           } else {
               res.redirect('/reason-and-soc-complete');
           }
   }
});



router.post('/statement-of-case/unreasonable/lived-together', function (req, res) {
  var livedTogether = req.body.livedTogether;
  var moreThan6Months = req.body.moreThan6Months;
  req.session.unreasonable.livedTogether = livedTogether;
  req.session.unreasonable.moreThan6Months = moreThan6Months;

  if (livedTogether === 'No' && moreThan6Months === 'No') {
    res.redirect('../../exit/unreasonable/six-month-period');
  } else {
    res.redirect('supporting-information');
  }
});

router.post('/statement-of-case/unreasonable/supporting-information', function (req, res) {
  req.session.unreasonable.unReasonableAllegation1 = req.body.unReasonableAllegation1;
  req.session.unreasonable.unReasonableAllegation2 = req.body.unReasonableAllegation2;
  req.session.unreasonable.unReasonableAllegation3 = req.body.unReasonableAllegation3;
  req.session.unreasonable.unReasonableAllegation4 = req.body.unReasonableAllegation4;
  console.log(req.session.unreasonable);
  res.redirect('/reason-and-soc-complete');
});

router.post('/statement-of-case/unreasonable/second-hand-information', function (req, res) {
  res.redirect('/reason-and-soc-complete');
});

// REMOVED ALL THE FOLLOWING IN CHANGE OF SCOPE TO DN QUESTIONS MOVE
// router.post('/statement-of-case/unreasonable/last-incident', function (req, res) {
//   function formatlastIncidentDate() {
//      if (req.session.unreasonable.lastIncidentDate) {
//          return req.session.unreasonable.lastIncidentDate.day + '/' + req.session.unreasonable.lastIncidentDate.month + '/' + req.session.unreasonable.lastIncidentDate.year;
//      }
//   }
//     var lastIncidentDate = {
//       day: req.body.day,
//       month: req.body.month,
//       year: req.body.year
//     };

//     req.session.unreasonable.lastIncidentDate = lastIncidentDate;
//     req.session.unreasonable.lastIncidentDateFormatted = moment(formatlastIncidentDate(), 'DD/MM/YYYY').format('DD MMMM YYYY');
//     req.session.unreasonable.behaviourContinuing = req.body.behaviourContinuing;
//     if (req.session.unreasonable.behaviourContinuing == "Yes") {
//         res.redirect('/reason-and-soc-complete');
//     } else
//     {
//         res.redirect('/statement-of-case/unreasonable/lived-together-since');
//     }


// });

// router.post('/statement-of-case/unreasonable/lived-together-since', function (req, res) {
//         res.redirect('/reason-and-soc-complete');
// });

// router.post('/statement-of-case/unreasonable/six-month-period', function (req, res) {
//     req.session.unreasonable.sixMonthsChoice = req.body.sixMonthsChoice;
//     switch(req.session.unreasonable.sixMonthsChoice) {
//         case "anotherExample":
//             res.redirect('/statement-of-case/unreasonable/supporting-information');
//             break;
//         case "checkTheDates":
//             res.redirect('/statement-of-case/unreasonable/lived-together-since');
//             break;
//         case "changeYourReason":
//             res.redirect('/reason-for-divorce');
//             break;
//         case "continueAnyway":
//             res.redirect('/legal-proceedings');
//             break;
//         default:
//             res.redirect('/legal-proceedings');
//             break;
//     }
// });

// REMOVED ALL THE ABOVE IN CHANGE OF SCOPE TO DN QUESTIONS MOVE



//Jurisdiction

//1. Hab Residency.

router.get('/jurisdiction/habitual-residence-concept', function (req, res) {
  res.render('jurisdiction/habitual-residence-concept', {divorceWho: req.session.divorceWho});
});

router.post('/jurisdiction/habitual-residence-concept', function (req, res) {
  req.session.jurisdiction.habitualResidence = req.body.habitualResidence;
  req.session.jurisdiction.respHabitualResidence = req.body.respHabitualResidence;
  req.session.jurisdiction.domiciled = {};
  req.session.jurisdiction.last12Months = {};
  req.session.jurisdiction.last6Months = {};
  req.session.jurisdiction.conditions = calculateJurisdictionConditions(req.session.jurisdiction, function (j) {
    req.session.jurisdiction = j;
    res.redirect(getNextJurisdictionStep('habitual-residence-concept', req.session.jurisdiction));
  });
});

//1b. Hab Res Interstitial
//
router.get('/jurisdiction/habitual-residence-concept-interstitial', function (req, res) {
  res.render('jurisdiction/habitual-residence-concept-interstitial', {divorceWho: req.session.divorceWho});
});

router.post('/jurisdiction/habitual-residence-concept-interstitial', function (req, res) {
  req.session.jurisdiction.addMoreInterstitial = req.body.addMoreInterstitial;
  req.session.jurisdiction.conditions = calculateJurisdictionConditions(req.session.jurisdiction, function (j) {
    req.session.jurisdiction = j;
    res.redirect(getNextJurisdictionStep('habitual-residence-concept-interstitial', req.session.jurisdiction));
  });
});
// 2. Domicile

router.get('/jurisdiction/domicile', function (req, res) {
  res.render('jurisdiction/domicile2', {divorceWho: req.session.divorceWho});
});

router.post('/jurisdiction/domicile', function (req, res) {
  req.session.jurisdiction.domiciled = req.body.domiciled;
  req.session.jurisdiction.respDomiciled = req.body.respDomiciled;
  req.session.jurisdiction.last12Months = {};
  req.session.jurisdiction.last6Months = {};
  req.session.jurisdiction.conditions = calculateJurisdictionConditions(req.session.jurisdiction, function (j) {
    req.session.jurisdiction = j;
    res.redirect(getNextJurisdictionStep('domicile', req.session.jurisdiction));
  });

});

// 3. Residency - 12 months
// 3. Residency - 12 months
router.post('/jurisdiction/last12Months', function (req, res) {
  req.session.jurisdiction.last12Months = req.body.last12Months;
  req.session.jurisdiction.conditions = calculateJurisdictionConditions(req.session.jurisdiction, function (j) {
    req.session.jurisdiction = j;
    res.redirect(getNextJurisdictionStep('last12Months', req.session.jurisdiction));
  });
});

//4. Residency 6 months
router.post('/jurisdiction/last6Months', function (req, res) {
  req.session.jurisdiction.last6Months = req.body.last6Months;
  req.session.jurisdiction.conditions = calculateJurisdictionConditions(req.session.jurisdiction, function (j) {
    req.session.jurisdiction = j;
    res.redirect(getNextJurisdictionStep('last6Months', req.session.jurisdiction));
  });
});

// 4. Exit

router.get('/jurisdiction/last-resort', function (req, res) {
    console.log(req.session.jurisdiction.conditions);
    res.render('jurisdiction/last-resort', { conditions: req.session.jurisdiction.conditions });
});

router.post('/jurisdiction/last-resort', function (req, res) {
    req.session.jurisdiction.conditions.a = req.body.conditionA;
    req.session.jurisdiction.conditions.b = req.body.conditionB;
    req.session.jurisdiction.conditions.c = req.body.conditionC;
    req.session.jurisdiction.conditions.d = req.body.conditionD;
    req.session.jurisdiction.conditions.e = req.body.conditionE;
    req.session.jurisdiction.conditions.f = req.body.conditionF;
    req.session.jurisdiction.conditions.g = req.body.conditionG;
    console.log("last-resort");
    console.log(req.session.jurisdiction.conditions);
    var j = req.session.jurisdiction;
    if (
        !j.conditions.a &&
        !j.conditions.b &&
        !j.conditions.c &&
        !j.conditions.d &&
        !j.conditions.e &&
        !j.conditions.f &&
        !j.conditions.g
    ) {
        res.redirect('exit');
    } else {
        if (req.session.checkYourAnswersMode == "Yes") {
            res.redirect('/check-your-answers');
        }
        else {
            res.redirect('jurisdiction-passed');
        }
    }
});

router.get('/jurisdiction/jurisdiction-passed', function (req, res) {
        req.session.divorceStatus.screeningComplete = "Yes";
        req.session.divorceStatus.nextStep = "Complete the divorce petition";
        req.session.divorceStatus.nextStepURL = "#complete-petition";
        console.log(req.session);
        //if (
        //    req.session.HasMarriageCertificate.hasMarriageCert == "Yes" &&
        //    req.session.hasRespondentAddress == "Yes" &&
        //    req.session.helpWithFeesHasRef == "Yes"
        //) {
            res.redirect('/about-you/confidential');
        //} else {
        //    //res.redirect('/progress-bar/stage-1-in-progress');
        //}
});



function getNextJurisdictionStep (referrer, j) { //j is the jurisdiction variable from req.session
    if (referrer == "habitual-residence-concept" && ((j.habitualResidence == "Yes" && j.respHabitualResidence == "Yes") || (j.habitualResidence == "No" && j.respHabitualResidence == "Yes")) ){
        // If both pet and resp are hab res OR if just the resp is hab res, then onto interstitial page.
        return "habitual-residence-concept-interstitial";
    }
    else if (referrer == "habitual-residence-concept") { // Remember, this code is only reached if the above conditions aren't met for this page, so we don't need to explicitly state the conditions to meet in order to go to domicile.
        // Otherwise they've got no jurisdiction yet, so down the long path they go...
        return "domicile";
    }

    if (referrer == "habitual-residence-concept-interstitial" && j.addMoreInterstitial == "Yes") {
        return "domicile";
    }
    else if (referrer == "habitual-residence-concept-interstitial") {
        return "jurisdiction-passed";
    }

    if (referrer == "domicile" && (j.habitualResidence == "Yes" || (j.habitualResidence == "Yes" && j.respHabitualResidence == "Yes"))) {
        return "last12Months";
    }
    if (referrer == "last12Months") {
        if (j.last12Months == "Yes") {
            return "habitual-residence-concept-interstitial";
        }
        else if (j.last12Months == "No") {
            return "last6Months";
        }
    }
    if (referrer == "last6Months") {
            return "habitual-residence-concept-interstitial";
    }
    //
    // If you get to this point then you need to go via the last resort page to move on.
    return "last-resort";
}


function calculateJurisdictionConditions(j, next) {
    var count = 0;
        j.conditions.a = "No";
        j.conditions.b = "No";
        j.conditions.c = "No";
        j.conditions.d = "No";
        j.conditions.e = "No";
        j.conditions.f = "No";
        j.conditions.g = "No";
    if (j.habitualResidence == "Yes" && j.respHabitualResidence == "Yes"){
        j.conditions.a = "Yes";
        count++;
    }
    if (j.respHabitualResidence == "Yes" ){
        j.conditions.c = "Yes";
        count++;
    }
    if ((j.habitualResidence == "Yes")
    && j.last12Months == "Yes") {
        j.conditions.d = "Yes";
        count++;
    }
    if ((j.habitualResidence == "Yes")
    && (j.domiciled == "Yes")
    && (j.last6Months == "Yes")
    ) {
        j.conditions.e = "Yes";
        count++;
    }
    if ((j.domiciled == "Yes") && (j.respDomiciled == "Yes")) {
        j.conditions.f = "Yes";
        count++;
    }
    j.numConditions = count;
    console.log("------------BEGIN--------------------------------------------");
    console.log("total conditions " + j.numConditions);
    console.log("conditions are: ");
    console.log(j);
    console.log("------------END----------------------------------------------");
    next(j);
}

router.get('/claim-costs', function (req, res) {
    res.render('claim-costs');
});

router.post('/claim-costs', function (req, res) {
    req.session.claimCosts.willClaim = req.body.claimCosts;
    req.session.claimCosts.claimFromRespondent = req.body.claimCostsFromRespondent;
    req.session.claimCosts.claimFromCoRespondent = req.body.claimCostsFromCoRespondent;

    res.redirect('/upload-docs/documents');
});

//
// DN STAGE
//

router.post('/dn-stage/help-with-fees-ammendment', function (req, res) {
    req.session.ammendmentWantsHelpWithFees = req.body.ammndmentWantsHelpWithFees;
    req.session.ammendmentHelpWithFeesHasRef = req.body.ammendmentHelpWithFeesHasRef;
    req.session.helpWithFeesReference = req.body.helpWithFeesReference;
    if (req.session.ammendmentHelpWithFeesHasRef == "No")
    {
        res.redirect('/exit/ammendment/no-help-with-fees-reference-number');
    }
    else {
        if (req.session.rejectedByLA == "Yes") {
            res.redirect('change-your-answers');
        } else {
            res.redirect('/reason-for-divorce');
        }
    }
});

router.get('/dn-stage/start',function (req,res) {
  function formatApplicationDate() {
     if (req.session.applicationDate) {
         return req.session.applicationDate.day + '/' + req.session.applicationDate.month + '/' + req.session.applicationDate.year;
     }
  }
    var applicationDate = {
      day: 28,
      month: 08,
      year: 2017
    };

    req.session.applicationDate = applicationDate;
    req.session.applicationDateFormatted = moment(formatApplicationDate(), 'DD/MM/YYYY').format('DD MMMM YYYY');
    req.session.mode = 'dnStage'; // eg. d8, dn, da etc.
    switch (req.query.origin_url) {
        case "/progress-bar/undefended":
            req.session.respondent.aos.willDefend = "No";
            req.session.state = "dn-stage-resp-accepts";
            res.redirect('/dn-stage/review-aos-response');
            break
        case "/progress-bar/deemed-service":
            req.session.respondent.aos.willDefend = "No";
            req.session.state = "dn-stage-deemed-service";
            res.redirect('/dn-stage/continue-with-divorce');
            break
        case "/progress-bar/dispensed-with-service":
            req.session.respondent.aos.willDefend = "No";
            req.session.state = "dn-stage-dispensed-with-service";
            res.redirect('/dn-stage/continue-with-divorce');
            break
        case "/progress-bar/resp-defends-awaiting-answer":
            req.session.respondent.aos.willDefend = "Yes";
            res.redirect('/dn-stage/review-aos-response');
            break
        case "/progress-bar/no-response":
            req.session.state = "dn-stage-no-response";
            res.redirect('/dn-stage/exit/dn-no-response');
            break
        case "/progress-bar/resp-does-not-admit-adultery":
            req.session.facts.reason = "adultery";
            req.session.respondent.aos.willDefend = "No";
            req.session.respondent.aos.reasonForDefending = "doesNotAdmitAdultery";
            req.session.respondent.aos.admitAdultery = "No";
            req.session.state = "dn-stage-resp-does-not-admit-adultery";
            res.redirect('/dn-stage/review-aos-response');
            break
        case "/progress-bar/defended-without-answer":
            req.session.respondent.aos.willDefend = "Yes";
            req.session.respondent.aos.didNotAnswer = "Yes";
            req.session.state = "dn-stage-resp-accepts";
            res.redirect('/dn-stage/continue-with-divorce');
            break
        case "/progress-bar/resp-does-not-consent":
            req.session.facts.reason = "separation-2-years";
            req.session.respondent.aos.willDefend = "No";
            req.session.state = "dn-stage-resp-does-not-consent";
            res.redirect('/dn-stage/review-aos-response');
            break
        case "/progress-bar/rejected-by-legal-advisor":
            req.session.dnAmendment = "Yes";
            req.session.rejectedByLA = "Yes";
            res.redirect('/dn-stage/help-with-fees-ammendment');
            break
        case "/progress-bar/more-information-needed":
            req.session.dnAmendment = "No";
            req.session.rejectedByLA = "Yes";
            req.session.state = "dn-stage-more-information";
            res.redirect('/dn-stage/more-information-upload-docs.html');
            break
    }
});

router.get('/da-stage/start',function (req,res) {
  function formatApplicationDate() {
     if (req.session.applicationDate) {
         return req.session.applicationDate.day + '/' + req.session.applicationDate.month + '/' + req.session.applicationDate.year;
     }
  }
    var applicationDate = {
      day: 28,
      month: 08,
      year: 2017
    };

    req.session.applicationDate = applicationDate;
    req.session.applicationDateFormatted = moment(formatApplicationDate(), 'DD/MM/YYYY').format('DD MMMM YYYY');
    req.session.mode = 'daStage'; // eg. d8, dn, da etc.
    if (req.session.facts.reason === undefined) {
        req.session.facts.reason = "unreasonable-behaviour";
    }
    switch (req.query.origin_url) {
        case "/progress-bar/apply-for-decree-absolute":
            res.redirect('/da-stage/continue-with-divorce');
            break
    }
});

router.post('/da-stage/continue-with-divorce', function (req, res) {
    req.session.continueWithDivorce = req.body.continueWithDivorce;
    if (req.session.continueWithDivorce == "Yes") {
       res.redirect('/da-stage/done'); }
    else {
        res.redirect('/da-stage/da-does-not-want-to-continue');
    }
});





router.get('/da-stage/start',function (req,res) {
  function formatApplicationDate() {
     if (req.session.applicationDate) {
         return req.session.applicationDate.day + '/' + req.session.applicationDate.month + '/' + req.session.applicationDate.year;
     }
  }
    var applicationDate = {
      day: 28,
      month: 08,
      year: 2017
    };

    req.session.applicationDate = applicationDate;
    req.session.applicationDateFormatted = moment(formatApplicationDate(), 'DD/MM/YYYY').format('DD MMMM YYYY');
    req.session.mode = 'daStage'; // eg. d8, dn, da etc.
    if (req.session.facts.reason === undefined) {
        req.session.facts.reason = "unreasonable-behaviour";
    }
    switch (req.query.origin_url) {
        case "/progress-bar/respondent-apply-for-decree-absolute":
            res.redirect('/da-stage/respondent-continue-with-divorce');
            break
    }
});




router.post('/da-stage/respondent-continue-with-divorce', function (req, res) {
    req.session.continueWithDivorce = req.body.continueWithDivorce;
    if (req.session.continueWithDivorce == "Yes") {
       res.redirect('/da-stage/respondent-hearing'); }
    else {
        res.redirect('/da-stage/respondent-da-does-not-want-to-continue');
    }
});






router.get('/progress-bar/date-of-your-decree-nisi-announcement', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "Yes";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/date-of-your-decree-nisi-announcement');
});

router.get('/progress-bar/application-issued', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/application-issued');
});

router.get('/progress-bar/apply-for-decree-absolute-blocked-fr', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "Yes";
    req.session.courtDocumentsAvailable.costsOrder = "Yes";
    req.session.courtDocumentsAvailable.decreeNisi = "Yes";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/apply-for-decree-absolute-blocked-fr');
});

router.get('/progress-bar/consent-given', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/consent-given');
});

router.get('/progress-bar/decree-nisi-granted', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "Yes";
    req.session.courtDocumentsAvailable.costsOrder = "Yes";
    req.session.courtDocumentsAvailable.decreeNisi = "Yes";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/decree-nisi-granted');
});

router.get('/progress-bar/defended-without-answer', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/defended-without-answer');
});

router.get('/progress-bar/divorce-finalised', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "Yes";
    req.session.courtDocumentsAvailable.costsOrder = "Yes";
    req.session.courtDocumentsAvailable.decreeNisi = "Yes";
    req.session.courtDocumentsAvailable.decreeAbsolute = "Yes";
    res.render('progress-bar/divorce-finalised');
});

router.get('/progress-bar/no-response', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/no-response');
});

router.get('/progress-bar/rejected-by-legal-advisor', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.refusalOrder = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/rejected-by-legal-advisor');
});

router.get('/progress-bar/application-refused', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.refusalOrder = "No";
    req.session.courtDocumentsAvailable.generalOrder = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/application-refused');
});


router.get('/progress-bar/more-information-needed', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.refusalOrder = "No";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/more-information-needed');
});


router.get('/progress-bar/resp-defends-awaiting-answer', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/resp-defends-awaiting-answer');
});

router.get('/progress-bar/resp-defends-with-answer', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/resp-defends-with-answer');
});

router.get('/progress-bar/resp-does-not-admit-adultery', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/resp-does-not-admit-adultery');
});

router.get('/progress-bar/resp-does-not-consent', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/resp-does-not-consent');
});

router.get('/progress-bar/respondent-apply-for-decree-absolute-blocked-fr', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "Yes";
    req.session.courtDocumentsAvailable.costsOrder = "Yes";
    req.session.courtDocumentsAvailable.decreeNisi = "Yes";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/respondent-apply-for-decree-absolute-blocked-fr');
});

router.get('/progress-bar/respondent-apply-for-decree-absolute', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "Yes";
    req.session.courtDocumentsAvailable.costsOrder = "Yes";
    req.session.courtDocumentsAvailable.decreeNisi = "Yes";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/respondent-apply-for-decree-absolute');
});

router.get('/progress-bar/undefended', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('progress-bar/undefended');
});

router.get('/da-stage/done', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "Yes";
    req.session.courtDocumentsAvailable.costsOrder = "Yes";
    req.session.courtDocumentsAvailable.decreeNisi = "Yes";
    req.session.courtDocumentsAvailable.decreeAbsolute = "Yes";
    res.render('da-stage/done');
});

router.get('/aos/done', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('aos/done');
});

router.get('/dn-stage/done', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.refusalOrder = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('dn-stage/done');
});




router.get('/aos/progress-bar/respond', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "No";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('aos/progress-bar/respond');
});

router.get('/aos/progress-bar/answer-submitted', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "No";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "No";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('aos/progress-bar/answer-submitted');
});


router.get('/aos/progress-bar/date-of-your-decree-nisi-announcement', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "Yes";
    req.session.courtDocumentsAvailable.costsOrder = "No";
    req.session.courtDocumentsAvailable.decreeNisi = "No";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('aos/progress-bar/date-of-your-decree-nisi-announcement');
});


router.get('/aos/progress-bar/decree-nisi-granted', function (req, res) {
    req.session.courtDocumentsAvailable = {};
    req.session.courtDocumentsAvailable.miniPetition = "Yes";
    req.session.courtDocumentsAvailable.certificateOfEntitlement = "Yes";
    req.session.courtDocumentsAvailable.costsOrder = "Yes";
    req.session.courtDocumentsAvailable.decreeNisi = "Yes";
    req.session.courtDocumentsAvailable.decreeAbsolute = "No";
    res.render('aos/progress-bar/decree-nisi-granted');
});





router.get('/dn-stage/start-behaviour-route',function (req,res) {
    req.session.facts.reason = "unreasonable-behaviour";
    res.redirect('/login/enter-password?registered=yes&returnAction=start-decree-nisi&loggedIn=yes');
    //res.redirect('/timeline/start-decree-nisi');

});

router.get('/dn-stage/start-desertion-route',function (req,res) {
    req.session.facts.reason = "desertion";
    res.redirect('/login/enter-password?registered=yes&returnAction=start-decree-nisi&loggedIn=yes');
    //res.redirect('/timeline/start-decree-nisi');
});

router.get('/dn-stage/start-any-other-reason-route',function (req,res) {
    req.session.facts.reason = "";
    res.redirect('/login/enter-password?registered=yes&returnAction=start-decree-nisi&loggedIn=yes');
    //res.redirect('/timeline/start-decree-nisi');
});


router.post('/dn-stage/exit/dn-no-response', function (req, res) {
    //Assumes the only next step from here is clicking CONTINUE beneath the option to supply another address.
        req.session.dnHasAnotherAddress = "Yes";
        res.redirect('/respondent/correspondence-address/postcode');
});

router.get('/dn-stage/review-aos-response', function (req, res) {
    res.render('dn-stage/review-aos-response');
});

router.post('/dn-stage/review-aos-response', function (req, res) {
    if (req.session.state == "dn-stage-resp-does-not-consent") {
        req.session.dnAmendment = "Yes";
       res.redirect('exit/submit-amended-application'); }
    else if (req.session.adultery.wishToName == "Yes") {
        res.redirect('review-aos-response-from-corespondent');
    }
    else if (req.session.state == "dn-stage-resp-does-not-admit-adultery") {
        res.redirect('resp-does-not-admit-adultery-options'); }
    else {
        res.redirect('continue-with-divorce');
    }
});

router.post('/dn-stage/exit/submit-amended-application', function (req, res) {
   req.session.dnAmendment = "Yes";
   res.redirect('/screening-questions/help-with-fees');
});




router.post('/dn-stage/more-information-upload-docs', function (req, res) {
   res.redirect('more-information-check-your-answers');
});


router.post('/dn-stage/more-information-check-your-answers', function (req, res) {
   res.redirect('done');
});


router.post('/dn-stage/review-aos-response-from-corespondent', function (req, res) {
    if (req.session.state == "dn-stage-resp-does-not-admit-adultery") {
        res.redirect('resp-does-not-admit-adultery-options'); }
    else {
        res.redirect('continue-with-divorce');
    }
});

router.post('/dn-stage/resp-does-not-admit-adultery-options', function (req, res) {
    switch(req.body.nextStep) {
        case "choose-another-reason":
            req.session.dnAmendment = "Yes";
            res.redirect('exit/submit-amended-application');
            break;
        default:
            req.session.dnAmendment = "No";
            res.redirect('/dn-stage/continue-with-divorce');
            break;
    }
});

router.post('/dn-stage/has-received-aos', function (req, res) {
    req.session.hasReceivedAOS = req.body.hasReceived;
    if (req.session.hasReceivedAOS == "Yes") {
       res.redirect('continue-with-divorce'); }
    else {
        res.redirect('/exit/dn-stage/has-not-received-aos');
    }
});

router.post('/dn-stage/resp-has-received-but-not-responded', function (req, res) {
    req.session.dnStageRespHasReceivedButNotResponded = req.body.dnStageRespHasReceivedButNotResponded;
    if (req.session.dnStageRespHasReceivedButNotResponded == "Yes") {
       res.redirect('exit/bailiff-service'); }
    else {
        res.redirect('exit/unable-to-serve-petition');
    }
});

router.post('/dn-stage/continue-with-divorce', function (req, res) {
    req.session.dnContinueWithDivorce = req.body.continueWithDivorce;
    if (req.session.dnContinueWithDivorce == "Yes") {
       res.redirect('review-your-petition'); }
    else {
        res.redirect('/dn-stage/exit/does-not-want-to-continue');
    }
});

router.post('/dn-stage/exit/does-not-want-to-continue', function (req, res) {
            res.redirect('/save-return/goodbye');
});

router.post('/dn-stage/review-your-petition', function (req, res) {
    switch (req.session.facts.reason) {
        case 'unreasonable-behaviour':
            res.redirect('behaviour-continued-since-application');
            break;
        case 'adultery':
            res.redirect('intolerable');
            break;
        case 'separation-2-years':
            res.redirect('lived-apart-since-separation');
            break;
        case 'separation-5-years':
            res.redirect('lived-apart-since-separation');
            break;
        case 'desertion':
            res.redirect('lived-apart-since-desertion');
            break;
        default:
            res.redirect('behaviour-continued-since-application');
    }
});











router.post('/dn-stage/intolerable', function (req, res) {
    req.session.adultery.intolerable = req.body.intolerable;
    if (req.session.adultery.intolerable == "Yes") {
        res.redirect('/dn-stage/first-find-out');
    } else {
        res.redirect('exit/intolerable');
    }

});

router.post('/dn-stage/first-find-out', function (req, res) {

  function formatFirstFindOutDate() {
     if (req.session.adultery.firstFindOutDate) {
         return req.session.adultery.firstFindOutDate.day + '/' + req.session.adultery.firstFindOutDate.month + '/' + req.session.adultery.firstFindOutDate.year;
     }
  }
    var firstFindOutDate = {
      day: req.body.day,
      month: req.body.month,
      year: req.body.year
    };

    req.session.adultery.firstFindOutDate = firstFindOutDate;
    req.session.adultery.firstFindOutDateFormatted = moment(formatFirstFindOutDate(), 'DD/MM/YYYY').format('DD MMMM YYYY');

    res.redirect('/dn-stage/lived-apart-since-adultery');
});















router.post('/dn-stage/lived-apart-since-adultery', function (req, res) {
            res.redirect('claim-costs');
});

router.post('/dn-stage/lived-apart-since-separation', function (req, res) {
            res.redirect('claim-costs');
});

router.post('/dn-stage/lived-apart-since-desertion', function (req, res) {
            res.redirect('claim-costs');
});
router.post('/dn-stage/lived-apart-since-application-date', function (req, res) {
    switch (req.session.facts.reason) {
        case 'desertion':
            res.redirect('desertion-spouse-offered-to-return');
            break;
        default:
            res.redirect('claim-costs');
    }
});



router.post('/dn-stage/reason-for-changing-application', function (req, res) {
    res.redirect('lived-together-since-application-date');
});

router.post('/dn-stage/verify-signature', function (req, res) {
    req.session.dnSignatureVerified = req.body.signatureVerified;
    if (req.session.dnSignatureVerified == "Yes") {
       res.redirect('lived-together-since-application-date'); }
    else {
        res.redirect('/exit/dn-stage/signature-not-verified');
    }
});

router.post('/dn-stage/lived-together-since-application-date', function (req, res) {
    switch (req.session.facts.reason) {
        case 'desertion':
            res.redirect('desertion-spouse-offered-to-return');
            break;
        case 'unreasonable-behaviour':
            res.redirect('behaviour-continued-since-application');
            break;
        default:
            res.redirect('claim-costs');
    }
});

router.post('/dn-stage/desertion-spouse-offered-to-return', function (req, res) {
    res.redirect('claim-costs');
});




router.post('/dn-stage/behaviour-continued-since-application', function (req, res) {

  function formatLastIncidentDate() {
     if (req.session.unreasonable.dnLastIncidentDate) {
         return req.session.unreasonable.dnLastIncidentDate.day + '/' + req.session.unreasonable.dnLastIncidentDate.month + '/' + req.session.unreasonable.dnLastIncidentDate.year;
     }
  }
    var LastIncidentDate = {
      day: req.body.day,
      month: req.body.month,
      year: req.body.year
    };


    req.session.dnBehaviourContinuedSinceApplicationDate == req.body.behaviourContinuedSinceApplicationDate;
    if (req.body.behaviourContinuedSinceApplicationDate == "No") {
        req.session.unreasonable.dnLastIncidentDate = LastIncidentDate;
        req.session.unreasonable.dnLastIncidentDateFormatted = moment(formatLastIncidentDate(), 'DD/MM/YYYY').format('DD MMMM YYYY');
        res.redirect('/dn-stage/lived-apart-since-last-incident-date');
    }
    else {
        res.redirect('claim-costs');
    }
});

router.post('/dn-stage/lived-apart-since-last-incident-date', function (req, res) {
        req.session.dnHaveLivedApartSinceLastIncidentDate = req.body.haveLivedApartSinceLastIncidentDate;
            res.redirect('claim-costs');
});

router.post('/dn-stage/six-month-period', function (req, res) {
    req.session.unreasonable.sixMonthsChoice = req.body.sixMonthsChoice;
    switch(req.session.unreasonable.sixMonthsChoice) {
        case "checkTheDates":
            res.redirect('/dn-stage/lived-apart-since-last-incident-date');
            break;
        case "continueAnyway":
            res.redirect('/legal-proceedings');
            break;
        default:
            res.redirect('/legal-proceedings');
            break;
    }
});


router.post('/dn-stage/claim-costs', function (req, res) {
        req.session.claimCosts.splitMethod = req.body.splitMethod;
        res.redirect('upload-docs');
});

function separationOrReason(req, res) {
  var marriageDate = req.session.MarriageDate.day + '/' + req.session.MarriageDate.month + '/' + req.session.MarriageDate.year;

  if(moment(marriageDate, 'DD/MM/YYYY').isBefore(moment().subtract(2, 'year').subtract(1, 'days'))) {
    res.redirect('/statement-of-case/separation/when-and-where');
  } else {
    res.redirect('/reason-for-divorce');
  }
}

router.get('/dn-stage/upload-docs', function (req, res) {
    if (req.query.admitAdultery == "No") {
        req.session.respondent.aos.admitAdultery = "No";
    }
    res.render('dn-stage/upload-docs');
});

router.post('/dn-stage/upload-docs', function (req, res) {
    res.redirect('check-your-answers');
});

router.post('/dn-stage/check-your-answers', function (req, res) {
    res.redirect('done');
});

router.get('/sitemap', function(req, res) {

  var routerRoutes=[];
  for (var stack in router.stack){
    routerRoutes.push(router.stack[stack].route.path);
  }
  var pathList=Array.from(new Set(routerRoutes.sort()));
  var section={};
  var routes=[];
  var exclude=['sitemap', 'robots.txt', 'check-session'];

  for (var path=0;path<pathList.length-1;++path){
    var singlePath = pathList[path+1].split('/');
    routes.push(pathList[path]);
    if(singlePath[1]!==pathList[path].split('/')[1]){
      routes=[];
    }
    section[singlePath[1]]=routes;
  }

  for(var e in exclude){
    delete section[exclude[e]];
  }

  res.render('sitemap', { files: section });

});

router.post('/dn-stage/documents/certificate-of-entitlement', function (req, res) {
    res.redirect('certificate-of-entitlement-downloaded');
});

router.post('/dn-stage/documents/certificate-of-entitlement-downloaded', function (req, res) {
    res.redirect('/progress-bar/date-of-your-decree-nisi-announcement');
});

router.post('/dn-stage/documents/decree-nisi', function (req, res) {
    res.redirect('decree-nisi-downloaded');
});

router.post('/dn-stage/documents/decree-nisi-downloaded', function (req, res) {
    res.redirect('/progress-bar/decree-nisi-granted');
});
router.post('/dn-stage/documents/costs-order', function (req, res) {
    res.redirect('costs-order-downloaded');
});

router.post('/dn-stage/documents/decree-absolute', function (req, res) {
    res.redirect('decree-absolute-downloaded');
});

router.post('/dn-stage/documents/decree-absolute-downloaded', function (req, res) {
    res.redirect('/progress-bar/divorce-finalised');
});

//--------------------------------------------------------------------
// Respondent journey

router.get('/IDAM/respond-with-pin', function (req, res) {
  //override the service name - this page is delivered by IDAM and so won't have one.
  if(req.query.continue_url) {
    req.session.continueUrl = req.query.continue_url;
  }
  res.render('IDAM/respond-with-pin');
});

router.post('/IDAM/respond-with-pin', function (req, res) {
  req.session.caseIslinked = true;
  if(req.session.continueUrl && req.session.isLoggedIn) {
    return res.redirect(req.session.continueUrl);
  }
  res.redirect('/IDAM/create-account');
});


router.post('/IDAM/create-account', function (req, res) {
    res.redirect('/IDAM/check-your-email');
});

router.post('/IDAM/create-account-v2', function (req, res) {
    res.redirect('/IDAM/check-your-email');
});

router.get('/aos/start',function (req,res) {
  function formatApplicationDate() {
     if (req.session.applicationDate) {
         return req.session.applicationDate.day + '/' + req.session.applicationDate.month + '/' + req.session.applicationDate.year;
     }
  }
    var applicationDate = {
      day: 28,
      month: 08,
      year: 2017
    };

    req.session.applicationDate = applicationDate;
    req.session.applicationDateFormatted = moment(formatApplicationDate(), 'DD/MM/YYYY').format('DD MMMM YYYY');
    /*
    if (req.session.facts.reason === undefined) {
        req.session.facts.reason = "unreasonable-behaviour";
        }
    */
    switch (req.query.origin_url) {
        case "/aos/progress-bar/respond":
            res.redirect(getNextAosStep(req, req.query.origin_url));
            break
        default:
            res.redirect(req, req.query.origin_url);
            break
    }
});

function getNextAosStep(req, path) {
    console.log("Path : " + path);
    switch(path) {
        case "/aos/progress-bar/respond":
            return "/aos/review-application";
        case "/aos/review-application":
            // if 2 yrs
            if (req.session.facts.reason == "separation-2-years") {
                return "/aos/consent-to-the-decree";
            } else if (req.session.facts.reason == "adultery") {
                return "/aos/admit-the-adultery";
            } else {
            return "/aos/choose-a-response";
            }
        case "/aos/jurisdiction":
            return "/aos/legal-proceedings";
        case "/aos/legal-proceedings":
            return "/aos/agree-to-pay-costs";
        case "/aos/choose-a-response":
            req.session.aos.response = req.body.response;
            if (req.session.aos.response == "agreesAndWillNotDefend") {
                req.session.aos.defend = "No";
            }
            if (req.session.aos.response == "disagreesAndWillNotDefend") {
                req.session.aos.defend = "No";
            }
            if (req.session.aos.response == "disagrees") {
                req.session.aos.defend = "Yes";
            }
            if (req.body.response == "disagrees") {
                //return "/aos/why-dont-you-agree";
                //if 5 yrs
                req.session.aos.defend = "Yes";
                if (req.session.facts.reason == "separation-5-years") {
                    return "/aos/defend-financial-hardship"; }
                else {
                    return "/aos/defend-are-you-sure";
                }
            }

            // if not defending, their route depends on which reason the petitioner used...
            if (req.session.facts.reason == "separation-2-years") {
                return "/aos/delay-the-decree";
            }
            else if (req.session.facts.reason == "separation-5-years") {
                return "/aos/delay-the-decree";
            }
            else {
                return "/aos/jurisdiction";
            }
        case "/aos/defend-are-you-sure":
            req.session.aos.defend = req.body.defend;
            if (req.body.continueWithDefence == "No") {
                return "choose-a-response";
            } else {
                return "/aos/jurisdiction";
            }
        case "/aos/defend-financial-hardship":
            req.session.aos.defendFinancialHardship = req.body.hardship;
                return "/aos/defend-are-you-sure";
        case "/aos/cross-petition-are-you-sure":
            return "/aos/jurisdiction";
        case "/aos/financial-hardship-details":
            return "/aos/defend-are-you-sure";
        case "/aos/consent-to-the-decree":
            req.session.aos.consent = req.body.consent;
            if (req.session.aos.consent == "No") {
                req.session.aos.defend = req.body.defend;
                if (req.session.aos.defend == "Yes") {
                    return "/aos/defend-are-you-sure";
                }
                else {
                    return "/aos/no-consent-are-you-sure";
                }
            }
            else { // if they DO consent
                    req.session.aos.defend = "No"
                    return "/aos/delay-the-decree";
            }
        case "/aos/no-consent-are-you-sure":
            if (req.body.continueWithNoConsent == "Yes") {
                return "/aos/delay-the-decree";
            } else {
                return "/aos/consent-to-the-decree";
            }
        case "/aos/delay-the-decree":
            return "/aos/jurisdiction";
        case "/aos/admit-the-adultery":
            req.session.respondent.aos.admitAdultery = req.body.admitAdultery;
            return "/aos/choose-a-response";
        case "/aos/agree-to-pay-costs":
            req.session.claimCosts.respAgreesToPayCosts = req.body.respAgreesToPayCosts;
            req.session.claimCosts.respSuggestedOtherAmount = req.body.otherAmount;
            req.session.claimCosts.respSuggestedOtherAmountExplanation = req.body.otherDetails;
            req.session.claimCosts.respReasonTheyWontPay = req.body.noDetails;
            return "/aos/contact-details";
        case "/aos/contact-details":
            return "/aos/check-your-answers";
        case "/aos/check-your-answers":
            return "/aos/done";
    }
}

router.get('/aos/', function (req, res) {
  // TO DO : clear the logged-in-status
  res.redirect('/IDAM/respond-with-pin');
});


router.post('/aos/confidential', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/contact-details', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.get('/aos/create-account', function (req, res) {
  //override the service name - this page is delivered by IDAM and so won't have one.
  res.render('aos/create-account', { "serviceName": " " });
});

router.post('/aos/create-account', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.get('/aos/check-your-email', function (req, res) {
  //override the service name - this page is delivered by IDAM and so won't have one.
  res.render('aos/check-your-email', { "serviceName": " " });
});

router.get('/aos/progress-bar/respond', function (req, res) {
  //override the service name - user is responding to a divorce!
  res.render('aos/progress-bar/respond');
});

router.post('/aos/review-application', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/jurisdiction', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/legal-proceedings', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/choose-a-response', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/why-dont-you-agree', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/financial-hardship-details', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/defend-financial-hardship', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/consent-to-the-decree', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/no-consent-are-you-sure', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/delay-the-decree', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/financial-hardship', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/admit-the-adultery', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/agree-to-pay-costs', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/defend-are-you-sure', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/cross-petition-are-you-sure', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/why-dont-you-agree', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});

router.post('/aos/check-your-answers', function (req, res) {
  res.redirect(getNextAosStep(req, req.route.path));
});
/* Bailiff journey */
router.post('/bailiff/introduction', function (req, res) {
  res.redirect('help-with-fees');
});

router.post('/bailiff/help-with-fees', function (req, res) {
  res.redirect('screener-photo');
});

router.post('/bailiff/screener-photo', function (req, res) {
    if (req.body.hasPhoto == "No" ) {
        res.redirect('exit/no-photo');
    }
    else {
      res.redirect('upload-photo');
    }

});

router.post('/bailiff/upload-photo', function (req, res) {
  res.redirect('distinguishing-features');
});

router.post('/bailiff/distinguishing-features', function (req, res) {
  res.redirect('respondent-contact-details');
});

router.post('/bailiff/respondent-contact-details', function (req, res) {
  res.redirect('best-time-to-visit');
});

router.post('/bailiff/best-time-to-visit', function (req, res) {
  res.redirect('vehicle-details');
});

router.post('/bailiff/vehicle-details', function (req, res) {
  res.redirect('about-the-respondent');
});

router.post('/bailiff/about-the-respondent', function (req, res) {
  res.redirect('about-the-property');
});

router.post('/bailiff/about-the-property', function (req, res) {
  res.redirect('pay-bailiff-fee');
});

router.post('/bailiff/pay-bailiff-fee', function (req, res) {
  res.redirect('/pay/enter-card-bailiff');
});


router.get('/corespondent-aos/start',function (req,res) {
  function formatApplicationDate() {
     if (req.session.applicationDate) {
         return req.session.applicationDate.day + '/' + req.session.applicationDate.month + '/' + req.session.applicationDate.year;
     }
  }
    var applicationDate = {
      day: 28,
      month: 08,
      year: 2017
    };

    req.session.applicationDate = applicationDate;
    req.session.applicationDateFormatted = moment(formatApplicationDate(), 'DD/MM/YYYY').format('DD MMMM YYYY');
    /*
    if (req.session.facts.reason === undefined) {
        req.session.facts.reason = "unreasonable-behaviour";
        }
    */
    switch (req.query.origin_url) {
        case "/corespondent-aos/progress-bar/respond":
            req.session.facts.reason = "adultery";
            req.session.adultery.wishToName = "Yes";
            req.session.adultery.corespondent.firstName = "Melissa";
            req.session.adultery.corespondent.lastName = "Hardy";

            res.redirect(getNextCorespondentAosStep(req, req.query.origin_url));
            break
        default:
            res.redirect(req, req.query.origin_url);
            break
    }
});

function getNextCorespondentAosStep(req, path) {
    console.log("Path : " + path);
    switch(path) {
        case "/corespondent-aos/progress-bar/respond":
            return "/corespondent-aos/review-application";
        case "/corespondent-aos/review-application":
            // if 2 yrs
            if (req.session.facts.reason == "separation-2-years") {
                return "/corespondent-aos/consent-to-the-decree";
            } else if (req.session.facts.reason == "adultery") {
                return "/corespondent-aos/admit-the-adultery";
            } else {
            return "/corespondent-aos/choose-a-response";
            }
        case "/corespondent-aos/jurisdiction":
            return "/corespondent-aos/legal-proceedings";
        case "/corespondent-aos/legal-proceedings":
            return "/corespondent-aos/agree-to-pay-costs";
        case "/corespondent-aos/choose-a-response":
            req.session.corespondent.aos.response = req.body.response;
            if (req.session.corespondent.aos.response == "agreesAndWillNotDefend") {
                req.session.corespondent.aos.defend = "No";
            }
            if (req.session.corespondent.aos.response == "disagreesAndWillNotDefend") {
                req.session.corespondent.aos.defend = "No";
            }
            if (req.session.corespondent.aos.response == "disagrees") {
                req.session.corespondent.aos.defend = "Yes";
                return "/corespondent-aos/defend-are-you-sure";
            }
            // if not defending, default to continuing to next step...
            return "/corespondent-aos/agree-to-pay-costs";
        case "/corespondent-aos/defend-are-you-sure":
            req.session.aos.defend = req.body.defend;
            if (req.session.aos.defend == "No") {
                return "choose-a-response";
            } else {
                return "/corespondent-aos/agree-to-pay-costs";
            }
        case "/corespondent-aos/defend-financial-hardship":
            req.session.aos.defendFinancialHardship = req.body.hardship;
                return "/corespondent-aos/defend-are-you-sure";
        case "/corespondent-aos/cross-petition-are-you-sure":
            return "/corespondent-aos/agree-to-pay-costs";
        case "/corespondent-aos/financial-hardship-details":
            return "/corespondent-aos/defend-are-you-sure";
        case "/corespondent-aos/consent-to-the-decree":
            req.session.aos.consent = req.body.consent;
            if (req.session.aos.consent == "No") {
                req.session.aos.defend = req.body.defend;
                if (req.session.aos.defend == "Yes") {
                    return "/corespondent-aos/defend-are-you-sure";
                }
                else {
                    return "/corespondent-aos/no-consent-are-you-sure";
                }
            }
            else { // if they DO consent
                    req.session.aos.defend = "No"
                    return "/corespondent-aos/delay-the-decree";
            }
        case "/corespondent-aos/no-consent-are-you-sure":
            if (req.body.continueWithNoConsent == "Yes") {
                return "/corespondent-aos/delay-the-decree";
            } else {
                return "/corespondent-aos/consent-to-the-decree";
            }
        case "/corespondent-aos/delay-the-decree":
            return "/corespondent-aos/agree-to-pay-costs";
        case "/corespondent-aos/admit-the-adultery":
            req.session.corespondent.aos.admitAdultery = req.body.admitAdultery;
            return "/corespondent-aos/choose-a-response";
        case "/corespondent-aos/agree-to-pay-costs":
            req.session.corespondent.claimCosts.coRespAgreesToPayCosts = req.body.coRespAgreesToPayCosts;
            req.session.corespondent.claimCosts.coRespReasonTheyWontPay = req.body.noDetails;
            return "/corespondent-aos/contact-details";
        case "/corespondent-aos/contact-details":
            return "/corespondent-aos/check-your-answers";
        case "/corespondent-aos/check-your-answers":
            return "/corespondent-aos/done";
    }
}

router.get('/corespondent-aos/', function (req, res) {
  // TO DO : clear the logged-in-status
  res.redirect('/IDAM/respond-with-pin');
});


router.post('/corespondent-aos/confidential', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/contact-details', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.get('/corespondent-aos/create-account', function (req, res) {
  //override the service name - this page is delivered by IDAM and so won't have one.
  res.render('aos/create-account');
});

router.post('/corespondent-aos/create-account', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.get('/corespondent-aos/check-your-email', function (req, res) {
  //override the service name - this page is delivered by IDAM and so won't have one.
  res.render('aos/check-your-email');
});

router.get('/corespondent-aos/progress-bar/respond', function (req, res) {
  //override the service name - user is responding to a divorce!
  res.render('corespondent-aos/progress-bar/respond');
});

router.post('/corespondent-aos/review-application', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/jurisdiction', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/legal-proceedings', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/choose-a-response', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/why-dont-you-agree', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/financial-hardship-details', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/defend-financial-hardship', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/consent-to-the-decree', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/no-consent-are-you-sure', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/delay-the-decree', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/financial-hardship', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/admit-the-adultery', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/agree-to-pay-costs', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/defend-are-you-sure', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/cross-petition-are-you-sure', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/why-dont-you-agree', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});

router.post('/corespondent-aos/check-your-answers', function (req, res) {
  res.redirect(getNextCorespondentAosStep(req, req.route.path));
});


module.exports = router;
