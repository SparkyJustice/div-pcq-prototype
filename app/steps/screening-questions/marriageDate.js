const Step = require('./../Step');
const DateUtil = require('app/utils/Date');
const {
  notAnswered,
  screeningQuestions: {
    marriageDate: { dayMissing, monthMissing, yearMissing, invalidDate }
  }
} = require('app/validationMessages');

const DateValidator = require('app/validators/DateValidator');

module.exports = class MarriageDate extends Step {

  get url() {
    return '/screening-questions/marriage-date';
  }

  get template() { return 'screening-questions/marriage-date'; }

  locals(context) {
    context.marriageDateError = () => {
      if (!('fields' in context)) return false;
      return ('marriageDate' in context.fields && context.fields.marriageDate.error)
        || ('day' in context.fields && context.fields.day.error)
        || ('month' in context.fields && context.fields.month.error)
        || ('year' in context.fields && context.fields.year.error);
    };
  }

  next(req, res) {
      const date = this._getFullDate(req.session.MarriageDate);
      req.session.marriageDate = DateUtil.formatTextual(date);

    if (DateUtil.isLessThanOneYear(date)) {
      res.redirect('../exit/screening-questions/marriage-date');
    } else {
        res.redirect('/screening-questions/in-the-uk');
      }
  }

  transform (session, payload) {
    if('MarriageDate' in session) {
      const marriageDate = session.MarriageDate;

      if('year' in marriageDate && 'month' in marriageDate &&
          'day' in marriageDate ) {
         payload.marriedOn = DateUtil.formatTextual(this._getFullDate(marriageDate));
      }
    }
  }

  validate(req, fields) {
    const date = new DateValidator(fields.day, fields.month, fields.year);

    date.basicDateValidation({
      notAnsweredError: () => fields.error('marriageDate', notAnswered),
      dayMissingError: () => fields.error('day', dayMissing),
      monthMissingError: () => fields.error('month', monthMissing),
      yearMissingError: () => fields.error('year', yearMissing),
      invalidError: () => fields.error('marriageDate', invalidDate)
    });
  }

  _getFullDate(date) {
    return `${date.day}/${date.month}/${date.year}`;
  }
};
