//script file


const $jobTitle = $("#title");
const $shirtDesign = $('#design');
const $shirtColors = $('#color');
const $colorsChildren = $shirtColors.children();
const $workshopFieldset = $('.activities');
// Object containing node list of workshops
const $workshops = $workshopFieldset.children().children();

// On page load, hide other 'Role' text input field in 'Basic' fieldset
$jobTitle.next().hide();
$jobTitle.next().next().hide();

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
  $colorsChildren.show();
  for (i = 1; i < $colorsChildren.length; i++) {
    if ($shirtDesign.eq(0).val() === 'js puns'){
      if ($colorsChildren.eq(i).val() === 'tomato' ||
          $colorsChildren.eq(i).val() === 'steelblue' ||
          $colorsChildren.eq(i).val() === 'dimgrey') {
        $colorsChildren.eq(i).hide();
      }
    } else if ($shirtDesign.eq(0).val() === 'heart js') {

      if ($colorsChildren.eq(i).val() === 'cornflowerblue' ||
          $colorsChildren.eq(i).val() === 'darkslategrey' ||
          $colorsChildren.eq(i).val() === 'gold') {
        $colorsChildren.eq(i).hide();
      }
    }
  }
});

// On select/deselect actions for workshops, check for conflicting $workshops
// and disable schedule conflicts
$workshops.on('change', function() {
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
});
