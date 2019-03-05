//Progressive enhancement form validation for Full Stack Conference registration

const $name = $('#name');
const $creditCardString = $('#cc-num');
const $email = $('#mail');
const $jobTitle = $("#title");
const $shirtDesign = $('#design');
const $colorDiv = $('#colors-js-puns');
const $workshopFieldset = $('.activities');
const $workshopsLegend = $('.activities legend');
const $workshops = $workshopFieldset.children().children();
const $payment = $('#payment');
// Set credit card as default payment method
$payment.val('credit card');
const $creditDiv = $('#credit-card');
const $zipCode = $('#zip');
const $cvv = $('#cvv');
const $submit = $('button');
// Regular expressions for form validation
const nameRegex = /.+/;
const emailRegex = /^\S+@\S+\.\S+$/;
const creditcardRegex = /^\d{13,16}$/g;
const zipcodeRegex = /^\d{5}$/;
const cvvRegex = /^\d{3}$/;
// Arrays to hold fields and reg. expressions for validation based on user
// selections
let regexArray = [];
let fieldValidatorArray = [];
// Array holds 'checked' if any workshopsare selected
let workshopChecked = [];

// Append instructions for entering email address
const $mailLabel = $( "[for='mail']");
$mailLabel.append('<h5 id="mail-error">must be formatted: string@string.string</h5>');
const $mailError = $('#mail-error');

// Append instructions for signing up for workshops
$workshopsLegend.append('<h6 id="workshops-error">Select at least one workshop</h6>')
const $workshopsError = $('#workshops-error');
const $bitcoinDiv = $('#bitcoin');
const $paypalDiv = $('#paypal');

// Append total cost field to workshops fieldset
$workshopFieldset.append('<div id="total_cost"><h3>Total Cost: $0</h3></div>');

// On page load: hide other 'Role' text input field in 'Basic' fieldset.
// hide workshop signup instructions
// hide t-shirt design. Hide the bitcoin and PayPal divs.
$jobTitle.next().hide();
$jobTitle.next().next().hide();
$colorDiv.hide();
$mailError.hide();
$workshopsError.hide();
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
$shirtDesign.on('change', function(){
  const $shirtColors = $('#color').children();
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
  // Check if workshops are checked and add price to totalCost displayed on page
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

// Display/hide payment information based on user input
$payment.on('change', function() {
  if($payment.val() === 'credit card') {
    $bitcoinDiv.hide();
    $paypalDiv.hide();
    $creditDiv.show();

  } else if ($payment.val() === 'bitcoin') {
    $creditDiv.hide();
    $paypalDiv.hide();
    $bitcoinDiv.show();

  } else if ($payment.val() === 'paypal') {
    $creditDiv.hide();
    $bitcoinDiv.hide();
    $paypalDiv.show();

  } else {
  }
});

// Real time error message for invalid email input
$email.on('keypress',function() {
  $email.val() === '';
  if (! emailRegex.test($email.val())) {
    $mailError.show();
  } else {
    $mailError.hide();
  }
});

// When submit button is clicked, two arrays are generated - one containing
// objects to be validated and one containing regular expressions to validate
// objects. The arraya are iterated and each pair evaluated in this function. If
// user inputs are invalid, the form is not submitted.
function regexTester (regex, string) {
  if(! regex.test(string.val())) {
    string.css('border-color', 'red');
    event.preventDefault();
  }
}

// Evaluate validity of user inputs.
$submit.on('click', function() {
  // Reset background colors and arrays.
  $creditCardString.css('border-color', '');
  $cvv.css('border-color', '');
  $zipCode.css('border-color', '');
  $name.css('border-color', '');
  $email.css('border-color', '');
  $payment.css('border-color', '');
  $workshopsLegend.css('color', '');

  regexArray = [];
  fieldValidatorArray = [];

// Check if any workships are selected.
  workshopChecked = [];
  for (i = 0; i < $workshops.length; i ++) {
    if ($workshops.eq(i).prop('checked')) {
      workshopChecked.push('checked');
    }
  }

// If no workshops are selected, prevent form from being submitted and display
// error
  if(! workshopChecked.includes('checked')) {
    $workshopsLegend.css('color', 'red');
    $workshopsError.show();
    event.preventDefault();
  } else {
    $workshopsError.hide();
  }

// Define the array to be sent to regex tester based on payment method
// for non-credit card selections
  if($payment.val() === 'credit card') {
    regexArray = [nameRegex, emailRegex, creditcardRegex, zipcodeRegex, cvvRegex];
    fieldValidatorArray = [$name, $email, $creditCardString, $zipCode, $cvv];

    for (i = 0; i < regexArray.length; i ++) {
      regexTester(regexArray[i], fieldValidatorArray[i]);
    }

  } else if ($payment.val() === 'paypal' || $payment.val() === 'bitcoin') {
    regexArray = [nameRegex, emailRegex];
    fieldValidatorArray = [$name, $email];

    for (i = 0; i < regexArray.length; i ++) {
      regexTester(regexArray[i], fieldValidatorArray[i]);
    }
  } else if ($payment.val() === 'select_method') {
    regexArray = [nameRegex, emailRegex];
    fieldValidatorArray = [$name, $email];
    $payment.css('border-color', 'red');
    for (i = 0; i < regexArray.length; i ++) {
      regexTester(regexArray[i], fieldValidatorArray[i]);
    }
  }
});
