const _ = require('underscore');

module.exports = {
  respsHusbandOrWife(session) {
    let divorce = {
      wife: 'husband',
      husband: 'wife',
      formerPartner: 'former partner'
    };

    let who = _.isEmpty(session.divorceWho) ? session.sameSexDivorceWho : session.divorceWho;

    return divorce[who] || 'husband/wife';

  },
  petsHusbandOrWife(session) {
    let divorce = {
      wife: 'wife',
      husband: 'husband',
      formerPartner: 'former partner'
    };

    let who = _.isEmpty(session.divorceWho) ? session.sameSexDivorceWho : session.divorceWho;

    return divorce[who] || 'husband/wife';

  },
  respsName(session) {
    let divorce = {
      wife: 'Elizabeth Jane Dante',
      husband: 'John James Dante',
      formerPartner: 'former partner'
    };

    let who = _.isEmpty(session.divorceWho) ? session.sameSexDivorceWho : session.divorceWho;

    return divorce[who] || 'Zoe Elizabeth Dante';

  },
  petsName(session) {
    let divorce = {
      wife: 'John James Dante',
      husband: 'Elizabeth Jane Dante',
      formerPartner: 'former partner'
    };

    let who = _.isEmpty(session.divorceWho) ? session.sameSexDivorceWho : session.divorceWho;

    return divorce[who] || 'John James Dante';

  },
  petsSpouseName(session) {
    let divorce = {
      wife: 'Elizabeth Jane Dante',
      husband: 'John James Dante',
      formerPartner: 'former partner'
    };

    let who = _.isEmpty(session.divorceWho) ? session.sameSexDivorceWho : session.divorceWho;

    return divorce[who] || 'Zoe Elizabeth Dante';

  },
  respsSpouseName(session) {
    let divorce = {
      wife: 'John James Dante',
      husband: 'Elizabeth Jane Dante',
      formerPartner: 'former partner'
    };

    let who = _.isEmpty(session.divorceWho) ? session.sameSexDivorceWho : session.divorceWho;

    return divorce[who] || 'John James Dante';

  },
  petsEmail(session) {
    let divorce = {
      wife: 'jjdante@hotmail.com',
      husband: 'zoe1971@gmail.com'
    };

    let who = _.isEmpty(session.divorceWho) ? session.sameSexDivorceWho : session.divorceWho;

    return divorce[who] || 'jjdante@hotmail.com';

  },
  respsEmail(session) {
    let divorce = {
      wife: 'zoe1971@gmail.com',
      husband: 'jjdante@hotmail.com'
    };

    let who = _.isEmpty(session.divorceWho) ? session.sameSexDivorceWho : session.divorceWho;

    return divorce[who] || 'zoe1971@gmail.com';

  },
  divorceWho(session) {
    let divorce = {
      wife: 'wife',
      husband: 'husband',
      formerPartner: 'former partner'
    };

    let who = _.isEmpty(session.divorceWho) ? session.sameSexDivorceWho : session.divorceWho;

    return divorce[who] || 'husband/wife';

  }

};
