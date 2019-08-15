const validationMessages = {
  notAnswered: 'Please answer this question',
  aboutYou: {
    firstNameMissing: 'Please enter your first name',
    lastNameMissing: 'Please enter your last name',
    nameOnCertificateMissing: 
      'Please select whether this is the name shown on your marriage certificate',
    dobMissing: 'Please enter your date of birth',
    dobBad: 'Please enter a date',
    dobDayMissing: 'Please enter your day of birth',
    dobMonthMissing: 'Please enter your month of birth',
    dobYearMissing: 'Please enter your year of birth',
    genderMissing: 'Please enter your gender',
    emailMissing: 'Please enter your email',
    phoneNumberBad: 'Please enter a valid phone number'
  },
  screeningQuestions: {
    hasMarriageCert: 'Please answer this question',
    marriageDate: {
      dayMissing: 'Please enter your day of marriage',
      monthMissing: 'Please enter your month of marriage',
      yearMissing: 'Please enter your year of marriage',
      invalidDate: 'Please enter a valid date'
    }
  },
  helpWithFees: {
    referenceNumberMissing: 'Reference number is required',
    referenceNumberValueMissing: 'Missing value in reference number'
  }
};

module.exports = validationMessages;
