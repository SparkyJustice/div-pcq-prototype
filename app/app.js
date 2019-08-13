const express = require('express');
const app = express.Router();

//Services
const validations = require(__dirname + 'app/services/validations');
const flags = new (require(__dirname + 'app/services/flags'))();

//Steps
const steps = [
  new (require(__dirname + 'app/steps/screening-questions/marriageDate'))(),
  new (require(__dirname + 'app/steps/screening-questions/hasMarriageCert'))(),
  new (require(__dirname + 'app/steps/done'))(),
  new (require(__dirname + 'app/steps/screening-questions/hasRespondentAddress'))(),
  new (require(__dirname + 'app/steps/help-with-fees/hasApplied'))(),
  new (require(__dirname + 'app/steps/genericError'))()
];

//Check Your Answers
const CheckYourAnswers = require(__dirname + 'app/steps/checkYourAnswers');
const checkYourAnswers = new CheckYourAnswers(steps);

app.use(validations);
flags.bind(app);

steps.forEach(step => app.use(step.url, step.router));

app.use(checkYourAnswers.url, checkYourAnswers.router);

module.exports = app;
