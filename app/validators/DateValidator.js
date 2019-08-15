const validator = require('validator');
const nullField = { value: undefined };

module.exports = class DateValidator {

  constructor (
    day = nullField,
    month = nullField,
    year = nullField
  ) {
    this.day = day.value;
    this.month = month.value;
    this.year = year.value;
  }

  dayMissing() {
    return typeof this.day === 'undefined' || validator.isEmpty(this.day);
  }

  monthMissing() {
    return typeof this.month === 'undefined' || validator.isEmpty(this.month);
  }

  yearMissing() {
    return typeof this.year === 'undefined' || validator.isEmpty(this.year);
  }

  notAnswered() {
    return this.dayMissing() && this.monthMissing() && this.yearMissing();
  }

  answered() {
    return !this.dayMissing() && !this.monthMissing() && !this.yearMissing();
  }

  valid() {
    const fullReverseDate = `${this.year}/${this.month}/${this.day}`;
    return validator.isDate(fullReverseDate);
  }

  basicDateValidation({
    dayMissingError = () => {},
    monthMissingError = () => {},
    yearMissingError = () => {},
    notAnsweredError = () => {},
    invalidError = () => {}
  }){
    let result = true;

    if (this.notAnswered()) {
      notAnsweredError();
      return false;
    } else {
      if (this.dayMissing()) {
        dayMissingError();
        result = false;
      }
      if (this.monthMissing()) {
        monthMissingError();
        result = false;
      }
      if (this.yearMissing()) {
        yearMissingError();
        result = false;
      }
      if (this.answered() && !this.valid()) {
        invalidError();
        return false;
      }
    }
    return result;
  }
};
