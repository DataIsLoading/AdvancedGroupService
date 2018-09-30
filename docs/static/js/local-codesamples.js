/*================================
  Adds features to 'local' ```lua
    code samples.
  Author(s): Connor Parrish
/*================================*/

$(document).ready(function(){
  $('.code-block').each(function() {
    // Code for setting a starting line number
    if (rawNumber = $(this).prev().text().match(/\(ln[0-9]+\)\s*/s)) {
      if (sanitizedNumber = rawNumber[0].match(/[0-9]+/)) {
        $("ol",this).attr("start", sanitizedNumber);
        $(this).prev().html($(this).prev().html().replace(rawNumber[0].trim(), ""));
      }
    }

    // Code for setting if the sample will be indented
    if (indent = $(this).prev().text().match(/\(indent\)/)) {
      $(this).attr('style', 'margin-left:40px; margin-bottom: 30px')
      $(this).prev().html($(this).prev().html().replace("(indent)", ""));
    }
  })
})
