/*================================
  Visualizes highlighted lines of code
    that are surrounded by <!{}!>
  Author(s): Connor Parrish
/*================================*/

highlight = false;

function highlightCode() {
  $('pre ol li span').each(function() {
    codeblock = $(this).parent().parent().parent().parent()

    if ($(this).text() === "<!") {
      $(this).hide()
      highlight = true;
    } else if ($(this).text() === "!>") {
      $(this).hide()
      highlight = false;
    }
    if (highlight) {
      $(this).addClass("highlighted")      
    }
  });
}
