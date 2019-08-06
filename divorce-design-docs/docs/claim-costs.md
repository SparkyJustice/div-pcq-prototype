# Claim costs

Currently, applicants can apply to claim costs when they make their
divorce application in a very rudimentary way, with a Yes/No answer to
the question of whether they want to claim their costs. I'll refer to
this as V1. A new design (V2)
(explained below) has been designed and signed-off by the judge and
policy, and will be built around Q2 next year. This design allows the
user to specify exactly how much they want to claim and under what
conditions.

The January release includes the AOS claim costs page and the DN claim
costs page, both of which are directly related to the claim costs question asked at
application stage, and for January will reflect V1 design.

When we upgrade the claim costs design to V2, all three services (PFE, AOS and
DN) will need to be upgraded simultaneously along with the questions
relating to claim costs asked of a solicitor. Both solicitors and PFE
services must produce identical outputs (mini-petition).

Some thought will need to be given about whether and how we should
migrate users who have started their application when V1 was running,
but come to respond, or apply for DN once V2 has launched. This could be
done using feature toggles, or run both version simultaneously but
set up the configuration so that V2 is backward compatible with V1 CCD
config.

## V1 changes for solicitors applications

Although citizens are asked a binary yes/no question when they apply,
solicitors are able to enter text into a box if they choose to claim
costs in their application. This text must be:

* shown on mini-petition (design here)
* shown in the claim costs page during the AOS journey (assuming that
    respondent's will do the AOS online if a solicitor initiates the
    case?)

This change is required urgently because solicitors will expect their
text to appear in the mini-petitions produced.

## V1 journey at application stage

[This question](http://localhost:3000/claim-costs) has already been built in PFE.

## V1 journey at AOS and DN stages

[The AOS question](http://localhost:3000/aos/agree-to-pay-costs) for claim costs is very straight-forward:

At DN stage the page changes depending on how the respondent responds at
AOS stage:

* if the respondent agrees to pay the costs [two options are presented
    to the applicant.](http://localhost:3000/dn-stage/claim-costs?claimCosts.respAgreesToPayCosts=Yes)
* if the respondent doesn't agree to pay the costs, [an additional
    option is presented to the applicant and the statement made by the
    respondent is shown to the applicant](http://localhost:3000/dn-stage/claim-costs?claimCosts.respAgreesToPayCosts=No&claimCosts.respReasonTheyWontPay=Because+why+should+I?).

## V2 journey

The V2 journey gives the applicant more nuanced options for how they
want to claim costs from their spouse.

### PFE

 * [All reasons except adultery](http://localhost:3000/claim-costs-v2?facts.reason=separation-2-years&claimCosts.applicantChoice=Yes) - Additional option shown at bottom, will only claim if the respondent defends. If the user chooses 'Yes' they must then choose from 4 options about how much they want to claim.
 * [Adultery with a named co-respondent](http://localhost:3000/claim-costs-v2?facts.reason=adultery&adultery.wishToName=Yes&claimCosts.applicantChoice=Yes&adultery.corespondent.firstName=Marjorie&adultery.corespondent.lastName=Lyle) - if a co-respondent is named, the option to only claim if the respondent defends is removed. If they select Yes, an alternative question is then asked about who the user wants to claim costs from (either respondent or co-respondent, or both). The full name of the co-respondent is shown in the label beside the coresponding radio button.

### AOS

V2 includes a new option to make a counter-offer to the applicant. This
option is not shown in the [different design for adultery if applicant claiming from both respondent and co-respondent](http://localhost:3000/aos/agree-to-pay-costs-v2?claimCosts.claimFromCoRespondent=Yes&adultery.wishToName=Yes) - note the additional clause in the first sentence in the first paragraph.

In all other scenarios:

* [If the applicant said they'd only claim costs if the respondent defends](http://localhost:3000/aos/agree-to-pay-costs-v2?facts.reason=unreasonable-behaviour&claimCosts.applicantChoice=YesIDefend) - note changes in both first sentences. All other scenarios below can co-exist with this choice.
* [If the applicant wants to split costs evenly](http://localhost:3000/aos/agree-to-pay-costs-v2?facts.reason=unreasonable-behaviour&claimCosts.splitMethod=even&claimCosts.applicantChoice=Yes)
* [If the applicant wants the respondent to pay all costs](http://localhost:3000/aos/agree-to-pay-costs-v2?facts.reason=unreasonable-behaviour&claimCosts.splitMethod=respondentPaysAll&claimCosts.applicantChoice=Yes)
* [If the applicant wants the respondent to pay a specific amount of costs](http://localhost:3000/aos/agree-to-pay-costs-v2?facts.reason=unreasonable-behaviour&claimCosts.splitMethod=respondentPaysSpecific&claimCosts.applicantChoice=Yes)
* [If the applicant wants the respondent to pay a percentage of the costs](http://localhost:3000/aos/agree-to-pay-costs-v2?facts.reason=unreasonable-behaviour&claimCosts.splitMethod=respondentPaysPercentage&claimCosts.applicantChoice=Yes)

### DN

Note: If the applicant said they'd only claim costs if the respondent defends then they shouldn't see this page (because they wouldn't be able to apply for decree nisi if the respondent had defended, and since they're not defending then you're not claiming costs because you said you wouldn't in that scenario).

The first sentence reminds the applicant of what they originally asked
for in their application:

* [If the applicant wants to split costs evenly](http://localhost:3000/dn-stage/claim-costs-v2?facts.reason=unreasonable-behaviour&claimCosts.splitMethod=even&claimCosts.applicantChoice=Yes)
* [If the applicant wants the respondent to pay all costs](http://localhost:3000/dn-stage/claim-costs-v2?facts.reason=unreasonable-behaviour&claimCosts.splitMethod=respondentPaysAll&claimCosts.applicantChoice=Yes)
* [If the applicant wants the respondent to pay a specific amount of costs](http://localhost:3000/dn-stage/claim-costs-v2?facts.reason=unreasonable-behaviour&claimCosts.splitMethod=respondentPaysSpecific&claimCosts.applicantChoice=Yes)
* [If the applicant wants the respondent to pay a percentage of the costs](http://localhost:3000/dn-stage/claim-costs-v2?facts.reason=unreasonable-behaviour&claimCosts.splitMethod=respondentPaysPercentage&claimCosts.applicantChoice=Yes)

The response from the respondent is shown beneath it:

 * [Agreed to pay costs](http://localhost:3000/dn-stage/claim-costs-v2?claimCosts.response=Agrees)
 * [Suggested another amount](http://localhost:3000/dn-stage/claim-costs-v2?claimCosts.response=Other)
 * [Didn't agree to pay costs](http://localhost:3000/dn-stage/claim-costs-v2?claimCosts.response=No)

Also note there's an additional choice shown to the applicant [If the respondent suggested paying another amount](http://localhost:3000/dn-stage/claim-costs-v2?facts.reason=desertion&claimCosts.response=Other). The additional option lets them accept the suggestion made by the respondent.

#### If claiming from a co-respondent

The co-respondent's response obviously isn't shown if the applicant isn't claiming costs from them. If they are claiming then there are three options:

 * [Responded and agreed](http://localhost:3000/dn-stage/claim-costs-v2?claimCosts.claimFromCoRespondent=Yes&adultery.wishToName=Yes&adultery.corespondent.firstName=sally&adultery.corespondent.lastName=Richards&corespondent.claimCosts.coRespDid&claimCosts.response=Agrees&claimCosts.coRespondentResponse=Agrees) - the co-respondent agreed to pay costs
 * [Responded and disagreed](http://localhost:3000/dn-stage/claim-costs-v2?claimCosts.claimFromCoRespondent=Yes&adultery.wishToName=Yes&adultery.corespondent.firstName=sally&adultery.corespondent.lastName=Richards&corespondent.claimCosts.coRespDid&claimCosts.response=Agrees&claimCosts.coRespondentResponse=No) - the co-respondent didn't agree to pay costs. Note the reason they gave appears in quotes beneath the response.
 * [No response from co-respondent](http://localhost:3000/dn-stage/claim-costs-v2?claimCosts.claimFromCoRespondent=Yes&adultery.wishToName=Yes&adultery.corespondent.firstName=sally&adultery.corespondent.lastName=Richards&corespondent.claimCosts.coRespDid&claimCosts.response=Agrees&claimCosts.coRespondentResponse=NoResponse) - the co-respondent didn't respond to the AOS

### Solicitors application journey

Changes to the mini-petition

Changes to the AOS response page

Changes to CCD for court staff

Changes to Costs Order page in Judicial UI

Changes to costs order template?
