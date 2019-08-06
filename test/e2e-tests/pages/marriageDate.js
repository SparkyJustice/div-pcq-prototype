'use strict';

let I;

module.exports = {
  _init() {
    I = actor();
  },

  dateFields: {
    date: '#day',
    month: '#month',
    year: '#year'
  },

  page() {
    I.amOnPage('/start');
    I.see('Start now');
    I.click('Start now');
    I.checkOption('End your marriage');
    I.checkOption('Your husband');
    I.click('Continue');
  },


  andEnterDate(day,month,year) {
    this.page();
    I.see('When did you get married?');
    I.fillField(this.dateFields.date, day);
    I.fillField(this.dateFields.month, month);
    I.fillField(this.dateFields.year, year);
  },

  andSelectYesForMarriageCertificate() {
    I.checkOption('Yes');
    I.click('Continue');
  }
};
