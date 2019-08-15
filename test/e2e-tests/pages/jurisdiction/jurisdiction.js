'use strict';

let I;

module.exports = {
  _init() {
    I = actor();
  },

  alwayslived: {
    Yes: '#livingquestion-yes',
    No: '#livingquestion-no'
  },

  page(){
    I.amOnPage('/jurisdiction/question-entire-lives');
  },

  andISelectYesForLivingQuestion() {
    I.checkOption(this.alwayslived.Yes );
  },

  andISelectNoForLivingQuestion()  {
    I.checkOption(this.alwayslived.No);
  }
};