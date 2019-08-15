var moment = require('moment');
const DATE_FORMATS = {
  preferred: 'DD/MM/YYYY',
  possible: ['D/MM/YYYY', 'DD/M/YYYY', 'D/M/YYYY']
};
const oneYearAgo = moment().subtract(1, 'year').subtract(1, 'days');
const twoYearsAgo = moment().subtract(2, 'year').subtract(1, 'days');

module.exports = {
  oneYearAgo,
  twoYearsAgo,

  isLessThanOneYear(date) {
    return moment(date, DATE_FORMATS.preferred).isAfter(oneYearAgo);
  },

  isAfterTwoYears(date) {
    return moment(date, DATE_FORMATS.preferred).isAfter(twoYearsAgo);
  },

  isBetween(date, fromDate, toDate){
    return moment(date, DATE_FORMATS.preferred).isBetween(fromDate, toDate);
  },

  formatTextual(date) {
    return moment((date), [DATE_FORMATS.preferred, ...DATE_FORMATS.possible], true
    ).format('Do MMMM YYYY');
  }

};
