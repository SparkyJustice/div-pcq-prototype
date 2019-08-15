/* eslint-disable no-unused-vars  */
/* eslint-disable no-undef  */
(function (global) {
  'use strict';
  var DIVORCE = {
    // Add/remove classes on reason for divorce step to switch background color of selected reason
    SwitchReasonColor: function(){
      var $multipleChoice = $('.multiple-choice');
      $multipleChoice.find('input[type="radio"]').click(function(){
          $multipleChoice.removeClass('selected-reason-state');
          $(this).parent().addClass('selected-reason-state');
      });
    }
  } ;
  global.DIVORCE = DIVORCE;
})(window);

$(document).ready(function() {
  //Call govuk toolkit constructor to use functionality show/hide content
  var showHideContent = new GOVUK.ShowHideContent();
  showHideContent.init();
  charactersLeft($( 'textarea' ), 1500);
});

function dateSlice(date)
{
  if (date.value.length > date.maxLength)
    date.value = date.value.slice(0, date.maxLength);
}


function charactersLeft(val, max, id) {
  $.each(val, function() {
    var len = this.value.length;
    var count = max - len;
    $('.char-count').text(count).prepend('Characters left: ');
    (count < 0) ? $('[id^=describe-wrapper-]').addClass('error') : $('[id^=describe-wrapper-]').removeClass('error');
  });
}