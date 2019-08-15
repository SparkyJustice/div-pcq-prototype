Feature('Filing divorce using new prototype');

Scenario('Filing divorce scenario', (I,IAmAtMarriageDatePage) => {
  IAmAtMarriageDatePage.andEnterDate('1','1','1980');
  I.click('Continue');
  I.see('Do you have your marriage certificate?');
});

Scenario('Verify validations on Marriage Date', (I, IAmAtMarriageDatePage) => {
  IAmAtMarriageDatePage.page();
  I.see('When did you get married?');
  IAmAtMarriageDatePage.andEnterDate('10','','');
  I.click('Continue');
  I.see('There was a problem');
  I.see('Please enter your month of marriage');
  I.see('Please enter your year of marriage');
  IAmAtMarriageDatePage.andEnterDate('10','50','');
  I.click('Continue');
  I.see('Please enter your year of marriage');
  IAmAtMarriageDatePage.andEnterDate('10','50','10');
  I.click('Continue');
  I.see('Please enter a valid date');
});

Scenario('No Marriage Certificate Available -You can\'t use Online service', (I, IAmAtMarriageDatePage) => {
  IAmAtMarriageDatePage.page();
  I.see('When did you get married?');
  IAmAtMarriageDatePage.andEnterDate('1','1','1980');
  I.click('Continue');
  I.see('Do you have your marriage certificate?');
  I.checkOption('No');
  I.click('Continue');
  I.see('Sorry, you can\'t use the online service');
});

Scenario('No Husband address available -You can\'t use Online service', (I,IAmAtMarriageDatePage) => {
  IAmAtMarriageDatePage.andEnterDate('1','1','1980');
  I.click('Continue');
  IAmAtMarriageDatePage.andSelectYesForMarriageCertificate();
  I.see('Do you have an address for your husband?');
  I.checkOption('No');
  I.click('Continue');
  I.see('Sorry, you can\'t use the online service');
});
