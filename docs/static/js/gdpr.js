var gdpr = ''
var gdprAgree = $.cookie('gdprAgree');

var gdprValue = $.md5('Yes')

if ( gdprAgree && gdprAgree.length > 0 ) {
  gdpr = true
} else {
  gdpr = false
}

$(document).ready(function() {
  if( gdprAgree && gdprAgree.length > 0 ) {
    gdpr = true
    $('.gdpr-panel').addClass('d-none');
    $("body").removeClass("gdpr-in")
  } else {
    gdpr = false
    $('.gdpr-panel').removeClass('d-none');
    $("body").addClass("gdpr-in")
  }

  $('.gdpr-panel .gdpr-accept').on('click',function() {
    $.cookie('gdprAgree', gdprValue, { expires: 365, path: '/' });
    window.location.reload();
  })

 /* if ($(".gdpr-panel").length > 0) {
    setHeaderTopWithGDPR();
  }*/

  // ***********************************************************
  // Resize Functionality
  // ***********************************************************

    var windowWidth = $(window).width();
    $(window).resize(function() {
      if ($(window).width() != windowWidth) {
        windowWidth = $(window).width();
        /*if ($(".gdpr-panel").length > 0) {
          setHeaderTopWithGDPR();
        }*/
      }
    });

})

/*function setHeaderTopWithGDPR() {
  var gdprPanelHeight = $(".gdpr-panel").innerHeight();
  $(".header").css("top", gdprPanelHeight)
}*/
