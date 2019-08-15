Feature('Verify Jurisdiction logical flow');

Scenario('Verify jurisdiction logical flow - If Living question answered Yes', (I, IAmAtJurisdiction) => {
  IAmAtJurisdiction.page();
  IAmAtJurisdiction.andISelectYesForLivingQuestion();
  I.click('Continue');
  I.see('Where did you get married?');
});

Scenario('Verify jurisdiction logical flow - If Living question answered No', (I, IAmAtJurisdiction) => {
  IAmAtJurisdiction.page();
  IAmAtJurisdiction.andISelectNoForLivingQuestion();
  I.click('Continue');
  I.see('How are you connected to England and Wales?');
});

Scenario('Verify jurisdiction- Your connections functionality', (I, IAmAtJurisdiction, IAmAtYourConnection) => {
  IAmAtJurisdiction.page();
  IAmAtJurisdiction.andISelectNoForLivingQuestion();
  I.click('Continue');
  IAmAtYourConnection.andISelect('habituallyResident');
  I.click('Continue');
  I.see('How is your husband/wife connected to England and Wales?');
});

Scenario('Verify jurisdiction- Your connections exit page if domiciled', (I, IAmAtJurisdiction, IAmAtYourConnection) => {
  IAmAtJurisdiction.page();
  IAmAtJurisdiction.andISelectNoForLivingQuestion();
  I.click('Continue');
  IAmAtYourConnection.andISelect('domiciled');
  I.click('Continue');
  I.see('Sorry, you can\'t use the online service');
});

Scenario('Verify jurisdiction- Your partner connections if hr and domiciled', (I, IAmAtJurisdiction, IAmAtYourConnection) => {
  IAmAtJurisdiction.page();
  IAmAtJurisdiction.andISelectNoForLivingQuestion();
  I.click('Continue');
  IAmAtYourConnection.andISelect('hrAndDomiciled');
  I.click('Continue');
  I.see('How is your husband/wife connected to England and Wales?');
});