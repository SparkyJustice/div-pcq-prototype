const express = require('express');
const app = express.Router();

//Services
const validations = require('app/services/validations');
const flags = new (require('app/services/flags'))();

//Steps
const steps = [
  new (require('app/steps/screening-questions/marriageDate'))(),
  new (require('app/steps/screening-questions/hasMarriageCert'))(),
  new (require('app/steps/done'))(),
  new (require('app/steps/screening-questions/hasRespondentAddress'))(),
  new (require('app/steps/help-with-fees/hasApplied'))(),
  new (require('app/steps/genericError'))()
];

//Check Your Answers
const CheckYourAnswers = require('app/steps/checkYourAnswers');
const checkYourAnswers = new CheckYourAnswers(steps);

app.use(validations);
flags.bind(app);

steps.forEach(step => app.use(step.url, step.router));

app.use(checkYourAnswers.url, checkYourAnswers.router);

module.exports = app;
