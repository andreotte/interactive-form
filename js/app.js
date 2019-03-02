//script file
// jQuery objects
const $name = $('#name');
const $email = $('#mail');
const $jobTitle = $("#title");
const $shirtDesign = $('#design');
const $colorDiv = $('#colors-js-puns');
const $shirtColors = $('#color').children();
const $workshopFieldset = $('.activities');
const $activitiesLegend = $('.activities legend');
const $workshops = $workshopFieldset.children().children();
const $payment = $('#payment');
const $creditCardString = $('#cc-num');
const $zipCode = $('#zip');
const $cvv = $('#cvv');
const $creditDiv = $('#credit-card');
const $bitcoinDiv = $('#bitcoin');
const $paypalDiv = $('#paypal');

const nameRegex = /.+/;
const emailRegex = /^\S+@\S+\.\S+$/;
const creditcardRegex = /^\d{13,16}$/g;
const zipcodeRegex = /^\d{5}$/;
const cvvRegex = /^\d{3}$/;
let regexArray = [nameRegex, emailRegex];
let fieldValidatorArray = [$name, $email];
let workshopChecked = [];
const $submit = $('button');

const $mailLabel = $( "[for='mail']");
$mailLabel.append('<h5 id="mail-error">must be formatted: string@string.string</h5>');
const $mailError = $('#mail-error');

$activitiesLegend.append('<h6 id="workshops-error">Select at least one workshop</h6>')
const $workshopsError = $('#workshops-error');
$workshopsError.hide();

// On page load, hide other 'Role' text input field in 'Basic' fieldset and add
// total cost field at the end of workshops section. Hide t-shirt design. Hide
//the bitcoin and PayPal divs
$jobTitle.next().hide();
$jobTitle.next().next().hide();
$colorDiv.hide();
$mailError.hide();
$workshopFieldset.append('<div id="total_cost"><h3>Total Cost: $0</h3></div>');
$bitcoinDiv.hide();
$paypalDiv.hide();

// When selections are made from 'Job Role' field, hide/display 'Role' text
// input field as appropriate
$jobTitle.on('change', function(){
  if ($jobTitle.eq(0).val() === 'other'){
    $jobTitle.next().show();
    $jobTitle.next().next().show().focus();
  } else {
    $jobTitle.next().hide();
    $jobTitle.next().next().hide();
  }
});

// When shirt design selection is changed, show color options available for the
// selected design
// TODO: when a design selection is made then color is changed -- design
// options don't change until the dropdown is selected.
$shirtDesign.on('change', function(){
  $colorDiv.show();
  $shirtColors.show();
  for (i = 1; i < $shirtColors.length; i++) {
    if ($shirtDesign.eq(0).val() === 'js puns'){
      if ($shirtColors.eq(i).val() === 'tomato' ||
          $shirtColors.eq(i).val() === 'steelblue' ||
          $shirtColors.eq(i).val() === 'dimgrey') {
        $shirtColors.eq(i).hide();
      }
    } else if ($shirtDesign.eq(0).val() === 'heart js') {

      if ($shirtColors.eq(i).val() === 'cornflowerblue' ||
          $shirtColors.eq(i).val() === 'darkslategrey' ||
          $shirtColors.eq(i).val() === 'gold') {
        $shirtColors.eq(i).hide();
      }
    }
  }
});

// On select/deselect actions for workshops, check for conflicting $workshops
// and disable schedule conflicts
$workshops.on('change', function() {
  let totalCost = 0;
  const $costDiv = $('#total_cost');
  // Objects representing workshops that do not have conflicts
  const $main = $("[name = 'all']");
  const $buildTools = $("[name = 'build-tools']");
  const $npm = $("[name = 'npm']");
  // Objects representing workshops that have conflicts:
    // Tuesday monrning conflicts
  const $jsFrameworks = $("[name = 'js-frameworks']");
  const $express = $("[name = 'express']");
    // Tuesday afternoon conflicts
  const $jsLibs = $("[name = 'js-libs']");
  const $node = $("[name = 'node']");

  // Disable/enable Tuesday morning conflicts
  if (this['name'] === 'js-frameworks') {
    if ($express.prop("disabled")) {
      $express.prop("disabled", false);

    } else {
      $express.prop("disabled", true);
    }
  } else if (this['name'] === 'express') {
      if ($jsFrameworks.prop("disabled")) {
        $jsFrameworks.prop("disabled", false);
      } else {
        $jsFrameworks.prop("disabled", true);
      }
  }

  // Disable/enable Tuesday afternoon conflicts
  if (this['name'] === 'js-libs') {
    if ($node.prop("disabled")) {
      $node.prop("disabled", false);
    } else {
      $node.prop("disabled", true);
    }
  } else if (this['name'] === 'node') {
      if ($jsLibs.prop("disabled")) {
        $jsLibs.prop("disabled", false);
      } else {
        $jsLibs.prop("disabled", true);
      }
  }

  function isChecked(workshop, price) {
    if (workshop.prop('checked')) {
      totalCost += price;
    }
  }

  isChecked($main, 200);
  isChecked($npm, 100);
  isChecked($jsFrameworks, 100);
  isChecked($express, 100);
  isChecked($jsLibs, 100);
  isChecked($node, 100);
  isChecked($buildTools, 100);
  // set the html of $costDiv to reflect totalCost
  $costDiv.html('<h3>Total Cost: $' + totalCost + '</h3>');
});

// TODO: on change function with if statements using .hide() method
$payment.on('change', function() {
  let regexArray = [nameRegex, emailRegex];
  let fieldValidatorArray = [$name, $email];
  if($payment.val() === 'credit card') {
    $bitcoinDiv.hide();
    $paypalDiv.hide();
    $creditDiv.show();
    regexArray.push(creditcardRegex);
    regexArray.push(zipcodeRegex);
    regexArray.push(cvvRegex);
    fieldValidatorArray.push($creditCardString);
    fieldValidatorArray.push($zipCode);
    fieldValidatorArray.push($cvv);

  } else if ($payment.val() === 'bitcoin') {
    $creditDiv.hide();
    $paypalDiv.hide();
    $bitcoinDiv.show();
    regexArray.pop(creditcardRegex);
    regexArray.pop(zipcodeRegex);
    regexArray.pop(cvvRegex);
    fieldValidatorArray.pop($creditCardString);
    fieldValidatorArray.pop($zipCode);
    fieldValidatorArray.pop($cvv);

  } else if ($payment.val() === 'paypal') {
    $creditDiv.hide();
    $bitcoinDiv.hide();
    $paypalDiv.show();
    regexArray.pop(creditcardRegex);
    regexArray.pop(zipcodeRegex);
    regexArray.pop(cvvRegex);
    fieldValidatorArray.pop($creditCardString);
    fieldValidatorArray.pop($zipCode);
    fieldValidatorArray.pop($cvv);
  } else {
  }
});

$email.on('keypress',function() {
  $email.val() === '';
  if (! emailRegex.test($email.val())) {
    $mailError.show();
  } else {
    $mailError.hide();
  }
});

$submit.on('click', function() {
  // Reset backgrounds if they have been turned red proviously
  $activitiesLegend.css('background-color', '');
  workshopChecked = [];
  for (i = 0; i < $workshops.length; i ++) {
    if ($workshops.eq(i).prop('checked')) {
      workshopChecked.push('checked');
    }
  }

  if(! workshopChecked.includes('checked')) {
    $activitiesLegend.css('background-color', 'red');
    $workshopsError.show();
    event.preventDefault();
  } else {
    $workshopsError.hide();
  }

  function regexTester (regex, string) {
    return regex.test(string.val());
  }

  for (i = 0; i < regexArray.length; i ++) {
    // Reset backgrounds if they have been turned red proviously
    fieldValidatorArray[i].css('border-color', '');
    if(! regexTester(regexArray[i], fieldValidatorArray[i])) {
      fieldValidatorArray[i].css('border-color', 'red');
      event.preventDefault();
    }
  }

});
