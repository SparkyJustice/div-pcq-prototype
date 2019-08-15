# Review AOS response

The following functionality is required. Each requirement is illustrated
with a prototype which simulates the conditions described. Jira tickets
should be included alongside requirements which have been captured by
BA's and put on the backlog.

## How the respondent wants to proceed

The first statement in this section reflects the respondent's decision on whether they want to defend when 
[complete their AOS](http://divorce-prototype.herokuapp.com/aos/choose-a-response). There
are between 2 and 3 options for the respondent to choose from:

- in cases of *adultery* or separation (either 2 or 5
    years) [2 options are given](http://divorce-prototype.herokuapp.com/aos/choose-a-response?facts.reason=adultery). 
- in cases of *desertion* or *unreasonable-behaviour*,
    [an additional option is given](http://divorce-prototype.herokuapp.com/aos/choose-a-response?facts.reason=desertion), which lets them say that they don't
    agree, but still want to continue without defending the divorce.

In all cases, when reviewing the response one of the following 3 statements must appear to the petitioner:

- [if the respondent will let the divorce proceed](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.defend=No)
- [if the respondent will let the divorce proceed, but doesn't agree
    with what the applicant has said](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.defend=No&respondent.aos.response=disagreesAndWillNotDefend)
- [if the respondent disagrees with the application and will defend](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.defend=Yes)

In cases of 5 years separation where the respondent is defending, based
on [this AOS question asking if they are defending because the divorce will cause them financial hardship](http://divorce-prototype.herokuapp.com/aos/defend-financial-hardship?defendFinancialHardship=Yes), one of the following 2 statements will also appear:

- [if the respondent says Yes](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.defend=Yes&respondent.aos.defendFinancialHardship=Yes#response)
- [if the respondent says No](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.defend=Yes&respondent.aos.defendFinancialHardship=No#response)

In cases of adultery, based on [this AOS question](http://localhost:3000/aos/admit-the-adultery), one of the following 2 statements will also appear:

- [if the the respondent admits to the adultery](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.defend=No&respondent.aos.admitAdultery=Yes)
- [if the the respondent does not admit to the adultery](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.defend=No&respondent.aos.admitAdultery=No)

_Note:_ It's permissible for a respondent to say that they [don't admit
the adultery](http://divorce-prototype.herokuapp.com/aos/admit-the-adultery) but still choose [not to defend](http://divorce-prototype.herokuapp.com/aos/choose-a-response?facts.reason=adultery).

In cases of 2 years separation, based on [this AOS question](http://divorce-prototype.herokuapp.com/aos/consent-to-the-decree) one of the following 2 statements will also appear:

- [if the respondent consents to the divorce](https://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.defend=No&respondent.aos.consent=Yes)
- [if the respondent does not consent to the divorce](https://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.defend=Yes&respondent.aos.consent=No)

In all separation cases, based on [this AOS question](http://divorce-prototype.herokuapp.com/aos/delay-the-decree), one of the following statements will also appear:

- [if the respondent intends to ask the court to delay the decree](https://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.delayTheDecree=Yes)
- [if the respondent does not intend to ask the court to delay the decree](https://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.delayTheDecree=No)

## Jurisdiction of the court

This section contains the responses given to the [jurisdiction](http://divorce-prototype.herokuapp.com/aos/jurisdiction) question
and the [legal proceedings](http://divorce-prototype.herokuapp.com/aos/legal-proceedings) question.

- [If they agree the court has jurisdiction](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.jurisdiction=Yes#jurisdiction)
- [If they don't agree](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.jurisdiction=No#jurisdiction)

The respondent was asked if there are any other proceedings which relate to the marriage.

- [If they say Yes](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.legalProceedings=Yes#jurisdiction)
- [If they say No](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?respondent.aos.legalProceedings=No#jurisdiction)

## Costs order

Full details of the costs journeys for all parties is documented
[elsewhere](costs order). Below are the possible answers the respondent
may have given:

- [If the respondent agrees to pay costs](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?claimCosts.respAgreesToPayCosts=Yes#costsOrder)
- [If they won't agree to pay costs](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response?claimCosts.respAgreesToPayCosts=No&claimCosts.respReasonTheyWontPay=Because+I+shouldn%27t+have+to&#costsOrder)

## Statement of truth and 'signature'

An [additional section at the bottom](http://divorce-prototype.herokuapp.com/dn-stage/review-aos-response#statementOfTruth) shows the petitioner that the
respondent signed a statement of truth. This is shown in the same style
used in the mini-petition.

