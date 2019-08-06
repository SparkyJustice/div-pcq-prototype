'use strict';

let I;

module.exports = {
  _init() {
    I = actor();
  },

  yourConnections: {
    habituallyResident: '#HR',
    domiciled: '#domiciledOnly',
    hrAndDomiciled: '#both',
    neitherHrAndDomiciled: '#neither'
  },

  andISelect(connection){
    I.checkOption(this.yourConnections[connection]);
  }
};