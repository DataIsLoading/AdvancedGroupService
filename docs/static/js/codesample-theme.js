/*================================
// Standardizes all code samples on the
//   page dependant on user preference
// Author(s): Connor Parrish
/*================================*/

// Initialize script
function run() {
  // Only set cookie if user has accepted cookies and doesn't have a preference
  if (!!$.cookie('gdprAgree')) {
    if (typeof $.cookie('theme') === 'undefined'){
      $.cookie('theme', 'light-theme', { path:'/' });
    }
    // Set all code sample classes to theme cookie
    $('.code-block').attr('class', 'code-block ' + $.cookie('theme'));
  } else {
    $('.code-block').attr('class', 'code-block light-theme');
  }

  // Updates textblocks if using dark-theme
  if ($('.code-block').hasClass('dark-theme')){
    $('.theme-name').text('Dark Theme');
  } else {
    $('.theme-name').text('Light Theme');
  }

  highlightCode();
}

$(document).ready(run);
