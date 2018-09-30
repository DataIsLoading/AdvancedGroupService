$(document).ready(function(){
  if($(".video-section-wrap .recommended-videos").length > 0 ){
    $(".video-section-wrap").addClass("only-video");
  } else {
    $(".video-section-wrap").removeClass("only-video");
  }

  $('.related-articles .related-article-img').each(function(index, elem) {
    var bgImagePath = $(elem).css('background-image')
    if( bgImagePath.indexOf('/assets/') <= -1 ){
      $(elem).addClass("default-img");
    }
  })

  if($("table").length > 0 ){
    $('table').each(function() {
      if(!$(this).hasClass('tbl-items')) {
        $(this).wrap( "<div class='table-responsive'></div>" );
      }
    });
  }

  $('.inherited-wrap .show-hide').on('click', function(e) {
      $(this).parents(".inherited-wrap").find('.inherited-tbls').slideToggle( 400, function() {
    });
    $(this).parents(".inherited-wrap").toggleClass("show-hide-tbl");
  });

  detectIEBrowser();
  setTimeout(function(){
    calcMainContainerTop();
  }, 500)

  // ***********************************************************
  // Resize 'half-sized' images to half of their native width
  // ***********************************************************
  var imgs = Array.from(document.getElementsByClassName('half-sized'));

  // Iterate through them and set their width on load
  imgs.forEach(function(img) {
      img.width = img.naturalWidth /2;
  });



  // ***********************************************************
  // Learn Landing page mobile dropdown
  // ***********************************************************

  if( $('.dropdown-wrap .mob-dropdown').length > 0 ){
    showTabsDropdown();
  }

  // ***********************************************************
  // Equal Hight box for Home page
  // ***********************************************************

  $("a").each(function(index, elem) {
    var hrefval = $(elem).attr('href');
    if(hrefval && hrefval.length > 0) {
      if( ( hrefval.indexOf("http") >=0 || hrefval.indexOf("https") >=0 ) ) {
        if( hrefval.indexOf("roblox.com") < 0 && hrefval.indexOf("cloudthis.com") < 0 && hrefval.indexOf("robloxdev.com") < 0 && hrefval.indexOf("assets.contentstack.io/v3/assets/bltc2ad39afa86662c8/") < 0 ) {
          $(elem).addClass("external-link");
        }
      }

      if( hrefval.indexOf("javascript:void") >=0 ) {
        $(elem).addClass("no-link");
      }
    }
  })

  $('.toggle-sidebar.expanded-slide').on('click', function(e) {
    $('.bd-sidebar-wrap').addClass('collapsed-sidebar');

    var slideDiv = $(".slide-sidebar");
    slideDiv.animate({'margin-left': '-277px'}, 400);

    $(".bd-sidebar-wrap").animate({'margin-right': '80px'}, 400);

  });

  $('.toggle-sidebar.collapse-slide').on('click', function(e) {
    $('.bd-sidebar-wrap').removeClass('collapsed-sidebar');

    var slideDiv = $(".slide-sidebar");
    slideDiv.animate({'margin-left': '0'}, 400);

    $(".bd-sidebar-wrap").animate({'margin-right': '0'}, 400);

  });

  $('.toggle-toc').on('click', function(e) {
    if( $(".bd-toc").hasClass('expand-collapse') ) {
      $(".toc-nav").animate({'margin-right': '0'}, 400);
      $(".toggle-txt").text("Hide content");
      $(".bd-toc-wrap").animate({'margin-left': '0'}, 400);
    } else {
      $(".toc-nav").animate({'margin-right': '-244px'}, 400);
      $(".toggle-txt").text("Show content");
      $(".bd-toc-wrap").animate({'margin-left': '80px'}, 400);
    }
    $(".bd-toc").toggleClass("expand-collapse")
  });


  $('.external-link').on('click', function(e) {
    e.preventDefault();
    var currentHref = $(this).attr("href");
    $('.external-page-modal').modal('show')
    $('.external-page-modal').find('.continue-link').attr("href",currentHref)
    $('.external-page-modal').find('.link').text(currentHref)
  });

  $('.external-page-modal .continue-link').on('click', function(e) {
    $('.external-page-modal').modal('hide');
  });

  // ***********************************************************
  // Slide Header Menu in Mobile View
  // ***********************************************************

    slideMenu();
    mobileLeftSidebar();
    searchSlideInMobile();

  // ***********************************************************
  // Pagination
  // ***********************************************************

   $("div.pagination-holder").jPages({
      containerID : "search-lists",
      perPage : 4,
      previous    : "",
      next        : ""
	});
	
	

   // ***********************************************************
  // Breadcrumbs Functionality
  // ***********************************************************

  /*if( $('.mobile ol.breadcrumb li').length > 5 ) {
    $('.mobile ol.breadcrumb').addClass("breadcrumb-collapse")
    $("<span class='expand-icon'>...</span>").appendTo(".mobile .breadcrumb-collapse .breadcrumb-item:first-child")
  }

  if( $('.desktop ol.breadcrumb li').length > 5 ) {
    $('.desktop ol.breadcrumb').addClass("breadcrumb-collapse")
    $("<span class='expand-icon'>...</span>").appendTo(".desktop .breadcrumb-collapse .breadcrumb-item:first-child")
  }

  $('.breadcrumb.breadcrumb-collapse .expand-icon').on('click', function(e) {
     $(this).parents("ol.breadcrumb").removeClass("breadcrumb-collapse");
  });*/

  // ***********************************************************
  // TOC Functionality
  // ***********************************************************

    if($(".bd-toc").length > 0) {
      calcTocHeight();
      if($(".gdpr-panel").length > 0) {
        $(".bd-content").removeClass("with-toc").addClass("with-toc-gdpr")
      }
      else {
        $(".bd-content").addClass("with-toc").removeClass("with-toc-gdpr")
      }
    }
    else {
      $(".bd-content").removeClass("with-toc");
      $(".bd-content").removeClass("with-toc-gdpr");
	}
	

  // ***********************************************************
  // Hash Functionality
  // ***********************************************************

    // $('#toc a').on('click', function(e) {
    //   e.preventDefault();
    //   var target = $(this).attr("href");
    //   setTimeout(function(){
    //     $('html, body').animate({
    //         scrollTop: $(target).offset().top
    //     }, 600, function() {
    //     });
    //     // location.hash = target;
    //     return false;
    //    }, 10)
    // });



    /*$('.section-nav a').on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr("href");
      setTimeout(function(){
        $('html, body').animate({
            scrollTop: $(target).offset().top - $('.header.navbar').innerHeight()
        }, 600, function() {
        });
        location.hash = target;
        return false;
       }, 100)
    });*/

    // $(window).scroll(function() {
    //   if ( $(".toc-r-scroll").length > 0) {
    //     tocScroll()
    //   }
    // }).scroll();


    $('.api-content').addClass('d-none')
    if( location.pathname.toLowerCase().indexOf('/api-reference/class') >= 0 ) {
      $('.class-content').removeClass('d-none')
      $('.class-content').addClass('toc-scope')
    } else if( location.pathname.toLowerCase().indexOf('/api-reference/property') >= 0 ) {
      $('.property-content').removeClass('d-none')
      // $('.property-content').addClass('toc-scope')
    } else if( location.pathname.toLowerCase().indexOf('/api-reference/function') >= 0 ) {
      $('.function-content').removeClass('d-none')
      // $('.function-content').addClass('toc-scope')
    } else if( location.pathname.toLowerCase().indexOf('/api-reference/event') >= 0 ) {
      $('.event-content').removeClass('d-none')
      // $('.event-content').addClass('toc-scope')
    } else if( location.pathname.toLowerCase().indexOf('/api-reference/callback') >= 0 ) {
      $('.callback-content').removeClass('d-none')
      // $('.callback-content').addClass('toc-scope')
    }


  // ***********************************************************
  // Toc Functionality
  // ***********************************************************

  var gdprShow = $(".gdpr-panel").hasClass("d-none")
  var gdprPanelHeight = gdprShow ? 0 : $(".gdpr-panel").innerHeight()
  var targetAboveSpace = $(".header").innerHeight() + gdprPanelHeight + 6
  // $(".bd-toc").css("top", targetAboveSpace);

  var navSelector = '#toc';
  var $myNav = $(navSelector);
  Toc.init({
    $nav: $('#toc'),
    $scope : $(".toc-scope")
  });
  $('body').scrollspy({
    target: navSelector,
    offset: targetAboveSpace
  });

  $('#toc a').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr("href");
    setTimeout(function(){
      $('html, body').animate({
          scrollTop: $(target).offset().top - targetAboveSpace
      }, 600, function() {
      });
      return false;
     }, 10)
  });

  

  // ***********************************************************
  // Load More Functionality - ajax call
  // ***********************************************************

    $('.load-more a').click(function(){

      var current = this
      // var len = $(this).attr('tutorial-fetch')
      $(current).addClass('d-none')
      $(current).prev().removeClass('d-none')

      var len = $(this).attr('tutorial-len')
      var type = $(this).attr('type')

      var sortby = $('select.custom-select-box').val()
      var pathname = location.pathname.split('/')
      var path1 = pathname[1]
      var path2 = pathname[2]

      if(type == 'articles') {
        tutorialType = 'article_landing_page'
      } else if(type == 'videos') {
        tutorialType = 'video_landing_page'
      } else if(type == 'recipes') {
        tutorialType = 'recipe_landing_page'
      } else if(type == 'code-samples') {
        tutorialType = 'code_sample'
      }

      if(type == 'all') {
        URL = "/learn-roblox/tutorialType" + "/path1/" + path1 + "/path2/" + path2 + '/len/' + len + "/sortby/" + sortby
      } else {
        URL = "/learn-roblox/"+ tutorialType + "/path1/" + path1 + "/path2/" + path2 + '/len/' + len + "/sortby/" + sortby + '/type/' + type
      }

      postData(URL,current)
    })

    // $('.custom-select-box').select2();
    select2WithoutSearch();

  // ***********************************************************
  // Select2 Chnage Functionality - ajax call
  // ***********************************************************

    // $('.custom-select-box').select2();

    $('select.custom-select-box').change(function(){
      $('.load-more').removeClass('d-none')
      var sortByVal = $(this).val()
      var pathname = location.pathname.split('/')
      var path1 = pathname[1]
      var path2 = pathname[2]
      URL = "/learn-roblox/path1/" + path1 + "/path2/" + path2 + "/sortby/" + sortByVal
      selectChangedPostData(URL)
    })

  // ***********************************************************
  // Search Functionality on API Pages
  // ***********************************************************

    setTimeout(function(){
      $('.bd-toc-item a.bd-toc-link').each(function(){
        if(!$(this).next().hasClass('display-none')) {
          $(this).parents(".bd-toc-item").addClass("has-open")
        } else {
          $(this).parents(".bd-toc-item").removeClass("has-open")
        }
      });
     }, 10)

    $('.bd-toc-item a.bd-toc-link').click(function() {
      $(this).next().toggleClass('display-none');
      $(this).next().find('li').toggleClass('display-none');
      if ($(this).next().hasClass('display-none')) {
        $(this).parents(".bd-toc-item").removeClass("has-open")
      } else {
        $(this).parents(".bd-toc-item").addClass("has-open")
      }
    })

    $('.bd-toc-item').find('ul.sub-nav li').removeClass('active')
    $('.multi-nested-list li').removeClass('active')

    $('.bd-toc-item').find('ul.sub-nav li a').each(function(index, elem){
      if( $(elem).attr('href') == location.pathname ){
        $(elem).parent().addClass('active')
        $(elem).parents('ul.sub-nav').find('li').removeClass('display-none')
        $(elem).parents('ul.sub-nav').removeClass('display-none')
      }
    })

    $('.multi-nested-list').find('li a').each(function(index, elem){
      if( $(elem).attr('href') == location.pathname ){
        $(elem).parent().addClass('active')
      }
    })

    $('.api-search input').keyup( function() {
		var key = this
		apiSearch(key)
	  });

    $('.learn-roblox-tutorial').each(function(index, elem){
      if( $(elem).find('a').attr('href') == location.pathname ){
        $(elem).find('a').addClass('active')
      }
    })

  // ***********************************************************
  // Resize Functionality
  // ***********************************************************

    var windowWidth = $(window).width();
    $(window).resize(function() {
      slideMenu();
      mobileLeftSidebar();
      searchSlideInMobile();
      select2Close();

      calcTocHeight();



      if ($(window).width() != windowWidth) {
        windowWidth = $(window).width();
        if( $('.dropdown-wrap .mob-dropdown').length > 0 ){
          showTabsDropdown();
        }
        setTimeout(function(){
          calcMainContainerTop();
        }, 500)
      }
    });

    $('.load-more a').each(function(index, elm){
      if( $(elm).attr('total') <= 12)
        $(elm).addClass('d-none')
    })

  // ***********************************************************
  // Code for Active Header Menu
  // ***********************************************************

    $('.navbar-inner ul.navbar-nav li a').removeClass('active')
    $('.navbar-inner ul.navbar-nav li a').each(function(index, elem){
      var hrefURL = $(elem).attr('href')
      var path = location.pathname

      if( path.indexOf(hrefURL) >= 0 ) {
        $(elem).addClass('active')
      }
    })

    $('.recommended-videos .media').each(function(index, elem){
      var youtubeid = $(elem).find('.media-body').attr("video-url").match(/[\w\-]{11,}/)[0];
      if( window.location.protocol.indexOf('https') >= 0 )
        var videoImage = 'https://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
      else
        var videoImage = 'http://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
      $(elem).find('img').attr('src',videoImage)
    })

    // if( $('.recommended-videos').length > 0 ) {
      $('.learning-materials-content .tab-content .videos a.video-tag').each(function(index, elem){
        var youtubeid = $(elem).attr("video-youtube-url").match(/[\w\-]{11,}/)[0];
        if( window.location.protocol.indexOf('https') >= 0 )
          var videoImage = 'https://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
        else
          var videoImage = 'http://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
        $(elem).find('.video-image').css('background-image', 'url(' + videoImage + ')');
      })
    // }

    $('.learning-materials-content .tab-content .all a.video-tag').each(function(index, elem){
      var youtubeid = $(elem).attr("video-youtube-url").match(/[\w\-]{11,}/)[0];
      if( window.location.protocol.indexOf('https') >= 0 )
        var videoImage = 'https://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
      else
        var videoImage = 'http://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
      $(elem).find('.video-image').css('background-image', 'url(' + videoImage + ')');
    })

  // ***********************************************************
  // Code for Append Hash tag in url - Learn Roblox
  // ***********************************************************

  $('.learning-materials-content ul.nav-tabs li').click(function(e){
	var target = $(this).find('a').attr("href");
	location.hash = target;
	e.preventDefault()
  })

  if( $('.learning-materials-content').length > 0 && window.location.hash.length > 0){
	var hash =  window.location.hash
	$('.learning-materials-content ul li a').removeClass('active')
	$('.learning-materials-content ul li').each(function(index, elem){
	  if( $(elem).find('a').attr('href') == hash ){
		$(elem).find('a').addClass('active')
	  }
	})

	$('.learning-materials-content .tab-content .tab-pane').removeClass('active')

	$('.learning-materials-content .tab-content .tab-pane').each(function(index, elem){
	  if( $(elem).attr('id') == hash.split('#')[1] ){
		$(elem).addClass('active')
	  }
	})

	setTimeout(function(){
	  $('html, body').animate({
		  scrollTop: 0
	  }, 800);
	}, 10)
  }
  // ***********************************************************
  // Code for syntax Highlighter
  // ***********************************************************

    if( $('pre').length > 0 ) {
      $(this).removeClass("prettyprint linenums lang-lua");

      $('pre').each(function(index, elem) {
        if ($(this).hasClass("nocode")) { // Added by Max to support the "Expected Output" window.
          $(this).addClass("prettyprint linenums");
        } else {
          $(this).addClass("prettyprint linenums lang-lua");
        }
        if ($(this).find("code").length > 0) {
          var code = $(this).find("code").html();
          $(this).html(code);
        }
        $(elem).attr("id", "id_" + index); // Added by brandon to support indented code blocks
        // Indent code block if list-indent is in the <pre> element being wrapped
        if ($(elem).hasClass("list-indent")) {
          // Set style of parent like below
          $(elem).wrap('<div class="code-block light-theme" style="margin-left:40px;"></div>');
          $(elem).removeClass("list-indent");
        } else {
	        // This is for local ```lua code-blocks that aren't full code samples
          if (!$(elem).parent().hasClass("code-block") && !$(elem).parent().hasClass("tab-pane")) {
            $(elem).wrap('<div class="code-block light-theme"></div>');
            themeToggle = '<a href="javascript:void(0)" class="theme-wrap local-code-theme-toggle">' +
        			              '<span class="theme-name">Light Theme</span>' +
                            '<span class="theme-icons">' +
      			                '	<i class="light-theme-icon icon"></i>' +
      			                '	<i class="dark-theme-icon icon"></i>' +
    			                  '</span>' +
        		              '</a>'

            $(elem).prepend(themeToggle)
            $(elem).attr('style', 'border-top:0px !important; border-bottom:0px !important')
          }
        }

        $(elem).parents(".code-block").find(".copy").attr("data-clipboard-target", "#id_" + index);
      });

      prettyPrint();


      // ***********************************************************
      // Fullscreen view
      // ***********************************************************

      $('.code-block .view').on('click', function(){
        $(this).parents(".code-block").toggleClass('fullscreen-view');
        if($(".code-block").hasClass("fullscreen-view")){
          $("body").css("overflow-y","hidden");

          if ($(".code-block").has("div.tab-content")) {
            console.log("expected")
          }
        }
        else {
          $("body").removeAttr("style");
        }
      })

      // ***********************************************************
      // Code for Theme Change
      //  Author(s): Connor Parrish
      // ***********************************************************

        $('.theme-wrap').on('click', function(){
          $('.code-block').toggleClass('dark-theme');

          if (!!$.cookie('gdprAgree')){
            if ($('.code-block').hasClass('dark-theme')) {
              $.cookie('theme', 'light-theme dark-theme', {path: '/'});
            } else {
              $.cookie('theme', 'light-theme', { path:'/' });
            }
          }

          // Update text with current Theme
          if ($('.code-block').hasClass('dark-theme')) {
            $('.theme-wrap').find('.theme-name').text('Dark Theme');
          } else {
            $('.theme-wrap').find('.theme-name').text('Light Theme');
          }

          highlightCode();
        });

      // ***********************************************************
      // Code for Copy
      // ***********************************************************

      $('.actions-panel .copy').each(function(index, elem){
        new ClipboardJS(this);
      })
    }

    // ***********************************************************
    // Search Page Tab Title
    // ***********************************************************

      if( location.pathname.indexOf('/search') >= 0 ){
        var tabTitle = ''
        var keyword = ''
        if( location.hash && location.hash.length > 0 ){
          if( location.hash.indexOf('&') >= 0 ){
            keyword = location.hash.split('&')[0].split('=')[1]
          } else {
            keyword = location.hash.split('=')[1]
          }
          keyword = decodeURI(keyword)
          tabTitle = 'Search Results: ' + keyword
        } else {
          tabTitle = 'Search Results'
        }
        $(document).prop('title',tabTitle);
      }


    // ***********************************************************
    // Video Landing Page - RECOMMENDED VIDEOS Functionality
    // ***********************************************************

      var currentPageTitle = document.title

      $(window).on('hashchange', function(e) {
        var hashVal = window.location.hash;
        var pageTitle;

        var page = location.pathname + location.search + location.hash;
        var pageURL = location.host + location.pathname + location.search + location.hash;
        // console.log(" ========== page page ====== ", page)
        // ga('set', 'page', page);
        // ga('send', 'pageview');

        // gtag('config', 'UA-121847288-1');
        // gtag('event', 'page_view', { 'send_to': 'UA-121847288-1' });
        if ( gdpr ) {
          gtag('config', 'UA-486632-22', {
            'page_location': pageURL,
            'page_path': page
          });
        }
        // console.log("========== GA Send ============= ")

        $('.learning-materials-content .nav-tabs li a').removeClass('active')
        $('.learning-materials-content .nav-tabs li a').each(function(index, elem){
          var href = $(elem).attr('href');
          if( href == hashVal ) {
            $(elem).addClass('active')
          }
        })

        $('.learning-materials-content .tab-content .tab-pane').removeClass('active')

        $('.learning-materials-content .tab-content .tab-pane').each(function(index, elem){
          if( $(elem).attr('id') == hashVal.split('#')[1] ){
            $(elem).addClass('active')
          }
        })

        if(hashVal == '') {
          $($('.learning-materials-content .nav-tabs li a')[0]).addClass('active')
          $($('.learning-materials-content .tab-content .tab-pane')[0]).addClass('active')
        }

        if( hashVal && hashVal.length > 0 ){
          var pageTitle = currentPageTitle + ' | ' + hashVal.split('#')[1]
        } else {
          var pageTitle = currentPageTitle
        }
        if( location.pathname.indexOf('/search') < 0 ) {
          $(document).prop('title',pageTitle);
        } else {
          var tabTitle = ''
          var keyword = ''
          var urlHashVal = location.hash
          if( location.hash && location.hash.length > 0 ){
            if( location.hash.indexOf('&') >= 0 ){
              keyword = location.hash.split('&')[0].split('=')[1]
            } else {
              keyword = location.hash.split('=')[1]
            }
            keyword = decodeURI(keyword)
            tabTitle = 'Search Results: ' + keyword
          } else {
            tabTitle = 'Search Results'
          }
          $('.search-container #st-search-page-input').val(keyword)
          $(document).prop('title',tabTitle);
        }
      });

      $('.bd-toc-item-wrap .api-index a.bd-toc-link').removeClass('active')
      $('.bd-toc-item-wrap .api-index a.bd-toc-link').each(function(index, elem) {
        var hrefVal = location.pathname
        if( $(elem).attr('href').trim() == hrefVal ) {
          $(elem).addClass('active')
        }
      })

    // ***********************************************************
    // API Class Left Sidebar Tree View - Funtionality
    // ***********************************************************

    var middleContentHeight = $(".bd-content").innerHeight();
    if (middleContentHeight > 600 ) {
      $('ul.multi-nested-list').css("max-height", middleContentHeight);

      $('ul.multi-nested-list').each(function() {
          $this = $(this);
          $this.find("li").has("ul").addClass("hasSubmenu");
      });
    }

    // Find the last li in each level
    $('ul.multi-nested-list li:last-child').each(function() {
      $this = $(this);
      // Check if LI has children
      if ($this.children('ul').length === 0) {
        // Add border-left in every UL where the last LI has not children
        $this.closest('ul').css("border-left", "1px dashed #cdd4d8");
      } else {
        // Add border in child LI, except in the last one
        $this.closest('ul').children("li").not(":last").css("border-left", "1px dashed #cdd4d8");
        // Add the class "addBorderBefore" to create the pseudo-element :defore in the last li
        $this.closest('ul').children("li").last().children("a").addClass("addBorderBefore");
        // Add margin in the first level of the list
        $this.closest('ul').css("margin-top", "20px");
        // Add margin in other levels of the list
        $this.closest('ul').find("li").children("ul").css("margin-top", "20px");
      };
    });

  // ***********************************************************
  // API Class Page Deprecated Switch - Funtionality
  // ***********************************************************

  $("table.table").each(function(index, elem) {
	var deprecated = $(elem).find('span.deprecated').text()
	if(deprecated && deprecated.length > 0) {
	  $(elem).addClass('d-none')
	  var id = $(elem).find("code.name h3").attr('id');
	  $('nav#toc ul li ul li').each(function(index, ele){
		var href = $(ele).find('a').attr('href').split("#")[1]
		if( id == href ) {
		  $(ele).addClass('d-none')
		}
	  })
	}
  })

  $('#switch_checkbox').change(function() {
	if( !$(this).is(':checked') ) {
	  $("table.table").each(function(index, elem) {
		var deprecated = $(elem).find('span.deprecated').text()
		if(deprecated && deprecated.length > 0) {
		  $(elem).addClass('d-none')
		  var id = $(elem).find("code.name h3").attr('id');
		  $('nav#toc ul li ul li').each(function(index, ele){
			var href = $(ele).find('a').attr('href').split("#")[1]
			if( id == href ) {
			  $(ele).addClass('d-none')
			}
		  })
		}
	  })
	} else {
	  $("table.table").each(function(index, elem) {
		var deprecated = $(elem).find('span.deprecated').text()
		if(deprecated && deprecated.length > 0) {
		  $(elem).removeClass('d-none')
		  var id = $(elem).find("code.name h3").attr('id');
		  $('nav#toc ul li ul li').each(function(index, ele){
			var href = $(ele).find('a').attr('href').split("#")[1]
			if( id == href ) {
			  $(ele).removeClass('d-none')
			}
		  })
		}
	  })
	}
  });

  //

  var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  $('ul.multi-nested-list a.tree-view').click(function(){
    $.cookie('classTree', true);
  })

  $('.bd-toc-item a.group').click(function(){
    delete_cookie('classTree')
  })

  if( $.cookie('classTree') ) {
    $('ul.nav-tabs li a').trigger('click')
  }


  if($(".bd-toc").length > 0) {
   var rightSideBarContent = $('.bd-toc-wrap .inner-toc-nav .navbar-nav').find('li').length
    if( rightSideBarContent <= 0 ) {
      $('.bd-toc-wrap').addClass("bd-toc-hide");
      $('.bd-content').css("margin-right", "80px");
    }
  }

  console.log("Test Auto Deployment on Staging");
  console.log("=====================================")

})


// ***********************************************************
// Document Ready END
// ***********************************************************

function postData(URL, current) {

  $.ajax({
    url: URL,
    type:'GET'
  })
  .done(function(data) {

    $(current).removeClass('d-none')
    $(current).prev().addClass('d-none')

    var type = data.type
    var cdn = $('.learning-materials-content #learningTabContent').attr('cdn-url')
    // $(".row."+type).empty();

    data.details.forEach(function(elem, index){

      if( elem && elem.title.length > 0 ) {
        var image = '';
        var shortDescription = '';
        var achore = '';
        var duration = '';
        var title = '';

        if( elem.type == 'videos' ) {
          // image = '<img class="img-fluid video-image" src=""/>'
          image = '<div class="image-icon video-image"></div>'
        } else {
          if( elem.thumbnail_image) {
            if( elem.thumbnail_image.uid && elem.thumbnail_image.uid.length > 0 ){
              var imgURL = cdn + elem.thumbnail_image._internal_url;
              // image = '<img class="img-fluid" src='+ elem.thumbnail_image._internal_url+'/>';
              image = '<div class="image-icon" style="background-image: url('+ imgURL +')"></div>'

            }
          }
          // Added by Max to support default thumbnails.
          if (image == '') {
            var imgURL = ''
            if (elem.type == 'articles') {
              imgURL = '/static/images/banner-1.png';
            } else if (elem.type == 'recipes') {
              imgURL = '/static/images/recipe-icon.png';
            } else if (elem.type == 'code-samples') {
              imgURL = '/static/images/code-sample-icon.png';
            }
            image = '<div class="image-icon" style="background-image: url(' + imgURL + ')"></div>'
          }
        }

        if( elem.type == 'videos' ) {
          if( elem.url && elem.url.length > 0 )
            achore = '<a class="video-tag" video-youtube-url='+  elem.video_url +' href='+ elem.url + '>'
        } else {
          if( elem.url && elem.url.length > 0 )
            achore = '<a href="'+ elem.url +'">'
        }

        if(elem.short_description && elem.short_description.length > 0) {
          shortDescription = '<div class="desc">' + elem.short_description + '</div>'
        }

        if(elem.duration && elem.duration.length > 0){
          duration = '<span class="time">' + elem.duration + '</span>'
        }

        if(elem.title && elem.title.length > 0){
          title = '<h5>'+ elem.title + '</h5>'
        }

        var details =  '<div class="col-sm-6 col-md-4 col-xl-3 mb-3">' +
                        achore +
                        '<div class="inner-wrap">' +
                          '<div class="heading-wrap">' +
                            '<span class="learning-type">' + elem.type + '</span>' +
                            duration +
                          '</div>' +
                            image +
                            title +
                          shortDescription +
                        '</div>'+
                        '</a>' +
                      '</div>'
        $('.row.'+type).append(details)
      }
    })

    if( type == 'videos' ) {
      $('.learning-materials-content .tab-content .videos a.video-tag').each(function(index, elem){
        var youtubeid = $(elem).attr("video-youtube-url").match(/[\w\-]{11,}/)[0];
        if( window.location.protocol.indexOf('https') >= 0 )
          var videoImage = 'https://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
        else
          var videoImage = 'http://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'

        // $(elem).find('img.video-image').attr('src',videoImage)
        $(elem).find('.video-image').css('background-image', 'url(' + videoImage + ')');
      })
    } else {
      $('.learning-materials-content .tab-content .all a.video-tag').each(function(index, elem){
        var youtubeid = $(elem).attr("video-youtube-url").match(/[\w\-]{11,}/)[0];
        if( window.location.protocol.indexOf('https') >= 0 )
          var videoImage = 'https://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
        else
          var videoImage = 'http://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
        // $(elem).find('img.video-image').attr('src',videoImage)
        $(elem).find('.video-image').css('background-image', 'url(' + videoImage + ')');
      })
    }



    $(current).attr('tutorial-len', data.length)
    // if( data.type == 'all') {
    //   $(current).attr('tutorial-fetch', data.length)
    // } else {
    //   $(current).attr('tutorial-fetch', data.length)
    // }
    $(current).attr('type', data.type)

    var currentLen = parseInt( $(current).attr('tutorial-len') )
    var totolLen = parseInt( $(current).attr('total') )


    if( currentLen == totolLen || currentLen > totolLen ){
      $(current).parent().addClass('d-none')
    }

  })
  .fail(function( xhr, status, error ) {
  })
}

function selectChangedPostData(URL) {
  $.ajax({
    url: URL,
    type:'GET'
  })
  .done(function(data) {
    var cdn = $('.learning-materials-content #learningTabContent').attr('cdn-url')

    $('.row.'+data.results[0].type).empty();
    $('.row.'+data.results[1].type).empty();
    $('.row.'+data.results[2].type).empty();
    $('.row.'+data.results[3].type).empty();
    $('.row.'+data.results[8].type).empty();

    data.results[0].articlesDetails.forEach(function(elem, index){

      var image = ''
      var shortDescription = ''
      var type = ''
      var duration = ''
      var title = ''
      var anchor = ''

      if(elem.thumbnail_image) {
        if( elem.thumbnail_image.uid && elem.thumbnail_image.uid.length > 0 ){
          var imgURL = cdn + elem.thumbnail_image._internal_url;
          // image = '<img class="img-fluid" src='+ elem.thumbnail_image._internal_url+'/>';
          image = '<div class="image-icon" style="background-image: url('+ imgURL +')"></div>'
        }
      }

      // Added by Max to support default thumbnails.
      if (image == '') {
        image = '<div class="image-icon" style="background-image: url(/static/images/banner-1.png)"></div>'
      }

      if(elem.short_description && elem.short_description.length > 0) {
        shortDescription = '<div class="desc">' + elem.short_description + '</div>'
      }

      if(elem.type && elem.type.length > 0){
        type = '<span class="learning-type">' + elem.type + '</span>'
      }

      if(elem.duration && elem.duration.length > 0){
        duration = '<span class="time">' + elem.duration + '</span>'
      }

      if(elem.title && elem.title.length > 0){
        title = '<h5>'+ elem.title + '</h5>'
      }

      if(elem.url && elem.url.length > 0){
        anchor = '<a href="'+ elem.url +'">'
      }


      var details =  '<div class="col-sm-6 col-md-4 col-xl-3 mb-3">' +
                anchor +
                '<div class="inner-wrap">' +
                  '<div class="heading-wrap">' +
                    type +
                    duration +
                  '</div>' +
                    image +
                    title +
                  shortDescription +
                '</div>'+
                '</a>' +
              '</div>'


      $('.row.'+data.results[0].type).append(details)
      $('.tab-content #'+data.results[0].type).find('.load-more a').attr('tutorial-len', data.results[0].length)
      $('.tab-content #'+data.results[0].type).find('.load-more a').attr('total', data.results[4].count)
      $('.tab-content #'+data.results[0].type).find('.load-more a').attr('type', data.results[0].type)
    })

    data.results[1].videosDetails.forEach(function(elem, index){

      var image = ''
      var shortDescription = ''
      var achore = ''
      var duration = ''
      var title = ''

      if( elem.type == 'videos' ) {
        // image = '<img class="img-fluid video-image" src=""/>'
        image = '<div class="image-icon video-image"></div>'
        achore = '<a class="video-tag" video-youtube-url='+  elem.video_url +' href='+ elem.url + '>'
      }

      if(elem.short_description && elem.short_description.length > 0) {
        shortDescription = '<div class="desc">' + elem.short_description + '</div>'
      }

      if( elem.duration && elem.duration.length > 0){
        duration = '<span class="time">' + elem.duration + '</span>'
      }

      if( elem.title && elem.title.length > 0){
        title = '<h5>'+ elem.title + '</h5>'
      }

      var details =  '<div class="col-sm-6 col-md-4 col-xl-3 mb-3">' +
                  achore +
                '<div class="inner-wrap">' +
                  '<div class="heading-wrap">' +
                    '<span class="learning-type">' + data.results[1].type + '</span>' +
                    duration +
                  '</div>' +
                    image +
                    title +
                  shortDescription +
                '</div>'+
                '</a>' +
              '</div>'

      $('.row.'+data.results[1].type).append(details)
      $('.tab-content #'+data.results[1].type).find('.load-more a').attr('total', data.results[5].count)
      $('.tab-content #'+data.results[1].type).find('.load-more a').attr('tutorial-len', data.results[1].length)
      $('.tab-content #'+data.results[1].type).find('.load-more a').attr('type', data.results[1].type)
    })

    $('.learning-materials-content .tab-content .videos a.video-tag').each(function(index, elem){
      var youtubeid = $(elem).attr("video-youtube-url").match(/[\w\-]{11,}/)[0];
      if( window.location.protocol.indexOf('https') >= 0 )
        var videoImage = 'https://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
      else
        var videoImage = 'http://img.youtube.com/vi/'+youtubeid+'/' + 'hqdefault' +'.jpg'
      $(elem).find('.video-image').css('background-image', 'url(' + videoImage + ')');
    })

    data.results[2].recipesDetails.forEach(function(elem, index){

      var image = ''
      var shortDescription = ''
      var duration = ''
      var title = ''
      var anchor = ''

      if( elem.thumbnail_image) {
        if( elem.thumbnail_image.uid && elem.thumbnail_image.uid.length > 0 ){
          var imgURL = cdn + elem.thumbnail_image._internal_url;
          // image = '<img class="img-fluid" src='+ elem.thumbnail_image._internal_url+'/>';
          image = '<div class="image-icon" style="background-image: url('+ imgURL +')"></div>'
        }
      }

      // Added by Max to support default thumbnails.
      if (image == '') {
        image = '<div class="image-icon" style="background-image: url(/static/images/recipe-icon.png)"></div>'
      }

      if(elem.short_description && elem.short_description.length > 0) {
        shortDescription = '<div class="desc">' + elem.short_description + '</div>'
      }

      if(elem.duration && elem.duration.length > 0){
        duration = '<span class="time">' + elem.duration + '</span>'
      }

      if(elem.title && elem.title.length > 0){
        title = '<h5>'+ elem.title + '</h5>'
      }

      if(elem.url && elem.url.length > 0){
        anchor = '<a href="'+ elem.url +'">'
      }

      var details =  '<div class="col-sm-6 col-md-4 col-xl-3 mb-3">' +
                anchor +
                '<div class="inner-wrap">' +
                  '<div class="heading-wrap">' +
                    '<span class="learning-type">' + data.results[2].type + '</span>' +
                    duration +
                  '</div>' +
                    image +
                    title +
                  shortDescription +
                '</div>'+
                '</a>' +
              '</div>'

      $('.row.'+data.results[2].type).append(details)
      $('.tab-content #'+data.results[2].type).find('.load-more a').attr('total', data.results[6].count)
      $('.tab-content #'+data.results[2].type).find('.load-more a').attr('tutorial-len', data.results[1].length)
      $('.tab-content #'+data.results[2].type).find('.load-more a').attr('type', data.results[2].type)
    })

    data.results[3].codeSampleDetails.forEach(function(elem, index){

      var image = ''
      var shortDescription = ''
      var duration = ''
      var title = ''
      var anchor = ''

      if( elem.thumbnail_image) {
        if( elem.thumbnail_image.uid && elem.thumbnail_image.uid.length > 0 ){
          var imgURL = cdn + elem.thumbnail_image._internal_url;
          // image = '<img class="img-fluid" src='+ elem.thumbnail_image._internal_url+'/>';
          image = '<div class="image-icon" style="background-image: url('+ imgURL +')"></div>'
        }
      }

      // Added by Max to support default thumbnails.
      if (image == '') {
        image = '<div class="image-icon" style="background-image: url(/static/images/code-sample-icon.png)"></div>'
      }

      if(elem.short_description && elem.short_description.length > 0) {
        shortDescription = '<div class="desc">' + elem.short_description + '</div>'
      }

      if(elem.duration && elem.duration.length > 0){
        duration = '<span class="time">' + elem.duration + '</span>'
      }

      if(elem.title && elem.title.length > 0){
        title = '<h5>'+ elem.title + '</h5>'
      }

      if(elem.url && elem.url.length > 0){
        anchor = '<a href="'+ elem.url +'">'
      }

      var details =  '<div class="col-sm-6 col-md-4 col-xl-3 mb-3">' +
                '<div class="inner-wrap">' +
                  anchor +
                  '<div class="heading-wrap">' +
                    '<span class="learning-type">' + data.results[3].type + '</span>' +
                    duration +
                  '</div>' +
                    image +
                    title +
                  shortDescription +
                '</div>'+
                '</a>' +
              '</div>'

      $('.row.'+data.results[3].type).append(details)
      $('.tab-content #'+data.results[3].type).find('.load-more a').attr('total', data.results[7].count)
      $('.tab-content #'+data.results[3].type).find('.load-more a').attr('tutorial-len', data.results[3].length)
      $('.tab-content #'+data.results[3].type).find('.load-more a').attr('type', data.results[3].type)
    })

    data.results[8].allTutorial.forEach(function(elem, index){

      var image = ''
      var shortDescription = ''
      var achore = ''
      var duration = ''
      var title = ''
      var type = ''

      if( elem && elem.type) {
        type = elem.type
      }

      if( elem && elem.type) {
        if( elem.type == 'videos' ) {
          image = '<div class="image-icon video-image"></div>'
          achore = '<a class="video-tag" video-youtube-url='+  elem.video_url +' href='+ elem.url + '>'
        } else {
          if( elem.thumbnail_image) {
            if( elem.thumbnail_image.uid && elem.thumbnail_image.uid.length > 0 ){
              var imgURL = cdn + elem.thumbnail_image._internal_url;
              image = '<div class="image-icon" style="background-image: url('+ imgURL +')"></div>'
            }
          }
          achore = '<a href="'+ elem.url +'">'
        }
      }

      if(elem && elem.short_description && elem.short_description.length > 0) {
        shortDescription = '<div class="desc">' + elem.short_description + '</div>'
      }

      if(elem && elem.duration && elem.duration.length > 0){
        duration = '<span class="time">' + elem.duration + '</span>'
      }

      if(elem && elem.title && elem.title.length > 0){
        title = '<h5>'+ elem.title + '</h5>'
      }

      var details =  '<div class="col-sm-6 col-md-4 col-xl-3 mb-3">' +
                achore +
                '<div class="inner-wrap">' +
                  '<div class="heading-wrap">' +
                    '<span class="learning-type">' + type + '</span>' +
                    duration +
                  '</div>' +
                    image +
                    title +
                  shortDescription +
                '</div>'+
                '</a>' +
              '</div>'

      $('.row.'+data.results[8].type).append(details)
      $('.tab-content #'+data.results[8].type).find('.load-more a').attr('tutorial-len', data.results[8].length)
      $('.tab-content #'+data.results[8].type).find('.load-more a').attr('total', data.results[8].count)
      $('.tab-content #'+data.results[8].type).find('.load-more a').attr('type', data.results[8].type)
    })

    $('.learning-materials-content .tab-content .all a.video-tag').each(function(index, elem){
      var youtubeid = $(elem).attr("video-youtube-url").match(/[\w\-]{11,}/)[0];
      if( window.location.protocol.indexOf('https') >= 0 )
        var videoImage = 'https://img.youtube.com/vi/'+youtubeid+'/'+ 'hqdefault' +'.jpg'
      else
        var videoImage = 'http://img.youtube.com/vi/'+youtubeid+'/'+ 'hqdefault' +'.jpg'
      $(elem).find('.video-image').css('background-image', 'url(' + videoImage + ')');
    })

  })
  .fail(function( xhr, status, error ) {
  })
}

function slideMenu() {
  var width = window.innerWidth || $(window).width()
  if (width < 992){
    $('.header .toggler-icon').on('click', function(){
      $(this).parents(".header").find(".navbar-inner").css("width","250px");
      $(this).parents(".header").find(".slide-overlay").css("display","block");
    })
    $('.header .closebtn').on('click', function(){
      $(this).parents(".header").find(".navbar-inner").css("width","0");
      $(this).parents(".header").find(".slide-overlay").css("display","none");
    })
  }
  else {
    $(".slide-overlay").removeAttr("style");
    $(".navbar-inner").removeAttr("style");
  }
}

function mobileLeftSidebar() {
  $(".header .bd-sidebar").removeClass("d-none d-lg-block col-md-3 col-lg-3 col-xl-3");
  var width = window.innerWidth || $(window).width()
  if (width < 992){
    $('.header .nav-item').addClass("mob-nav-item");
    $('.header .mob-nav-item').each(function() {
      if($(this).find('.bd-sidebar').length !== 0) {
        $(this).addClass('has-sidebar');
      }
      var hrefVal = $(this).find('.nav-link').attr("href");
      if (hrefVal.indexOf("http") >= 0 || hrefVal.indexOf("/articles") >= 0) {
        $(this).removeClass('has-sidebar');
      }
    });


    $('.header .mob-nav-item .nav-link').on('click', function(e){
      var hrefVal = $(this).attr("href");
      if (hrefVal.indexOf("http") >= 0 || hrefVal.indexOf("/articles") >= 0) {
        $(this).parent().removeClass('has-sidebar');
      } else {
        if($('.header .nav-item').hasClass("mob-nav-item")) {
          e.preventDefault();
        }

        if (hrefVal.indexOf("/api-reference") >= 0) {
          $(this).parent().find(".api-sidebar-show .bd-sidebar").addClass("sidebar-visible");
          $(this).parent().find(".tutorials-sidebar-show .bd-sidebar").removeClass("sidebar-visible");
        }
        else {
          $(this).parent().find(".api-sidebar-show .bd-sidebar").removeClass("sidebar-visible");
          $(this).parent().find(".tutorials-sidebar-show .bd-sidebar").addClass("sidebar-visible");
        }
      }
    });
    $('.bd-sidebar .back-icon span').on('click', function(){
      $(this).parents('.bd-sidebar').removeClass("sidebar-visible");
    });

    $('.header .slide-overlay').on('click', function(){
      $(this).css("display","none");
      $(".header .wrap .navbar-inner").removeAttr("style");
      $('.bd-sidebar').removeClass("sidebar-visible");
    });
  }
  else {
    $('.header .nav-item').removeClass("mob-nav-item");
    $('.header .nav-item').removeClass("has-sidebar");
    $('.bd-sidebar').removeClass("sidebar-visible");
  }
}

function searchSlideInMobile() {
  var width = window.innerWidth || $(window).width()
  if (width < 768){
    $(".header").find(".search-box").removeClass('expanded');
    $('.header .m-search-icon').on('click', function(){
      $(this).parents(".header").find(".search-box").addClass('expanded');
      $(".search-box .form-control").focus();
    })
    $('.header .search-close').on('click', function(){
      $(this).parents(".header").find(".search-box").removeClass('expanded');
    })
  }
  else {
    $(".header").find(".search-box").removeClass('expanded');
  }
}

function select2WithoutSearch() {
  $(".custom-select-box").select2({
      dropdownCssClass: 'custom-select-dropdown',
      minimumResultsForSearch: -1
  });
  var touchDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
  if((touchDevice)){
    $(".custom-select-box .select2-search, .custom-select-box .select2-focusser").remove();
  }
}

function select2Close() {
  $(".select2-container.select2-dropdown-open").select2('close');
}

function setEqualHeight(columns) {
  var tallestcolumn = 0;
  setTimeout(function(){
    columns.each(function(index, elem) {
        currentHeight = $(elem).height();
        if(currentHeight > tallestcolumn) {
          tallestcolumn  = currentHeight;
        }
    });
    columns.height(tallestcolumn);
  },10)
}


function apiSearch(key){

  var classGroupLen = $('#grouped .bd-toc-item-wrap.class_categories .bd-toc-item').length
  var classTreeLen = $('#class-tree ul.multi-nested-list li').length
  var count = 0
  var cnt = 0

  if( key.value.length == 0 ) {
    $('.bd-toc-item').find('ul.sub-nav').addClass('display-none')
    $('.bd-toc-item').find('ul.sub-nav li').addClass('display-none')
    $(".bd-toc-item").removeClass("has-open")
    $('.class_categories .bd-toc-item').removeClass('display-none')
    $('.bd-toc-item').find('ul.sub-nav li a').each(function(index, elem){
      if( $(elem).attr('href') == location.pathname ){
        $(elem).parent().addClass('active')
        $(elem).parents(".bd-toc-item").addClass("has-open")
        $(elem).parents("ul.sub-nav").find('li').removeClass('display-none')
        $(elem).parents('ul.sub-nav').removeClass('display-none').addClass('display-block')
      }
    })

    $('ul.multi-nested-list li').removeClass('d-none')
    $('ul.multi-nested-list li').removeClass('match-li')
    $('.multi-nested-list').removeClass('search-filter')
  }

  if( key.value.length < 4)
    return;

  var currVal = key.value.toLowerCase()
  $('.bd-toc-item').find('ul.sub-nav').addClass('display-none')
  $('.bd-toc-item').removeClass('has-open')
  $('.class_categories .bd-toc-item').addClass('display-none')

  $('.bd-toc-item').find('ul.sub-nav li').each(function(index, elem) {
    $(elem).addClass('display-none')
    var category = $(elem).attr('data-sub-category')
    if( category.indexOf(currVal) >= 0 ) {
      count++
      $(elem).removeClass('display-none')
      $(elem).parent().removeClass('display-none')
      $(elem).parent().parent().removeClass('display-none')
      $(elem).parents('.bd-toc-item').addClass('has-open')
    }
  })

  $('ul.multi-nested-list li').addClass('d-none')
  $('ul.multi-nested-list li').removeClass('match-li')
  $('ul.multi-nested-list li a span').each(function(index, elem){
    var label = $(elem).text().toLowerCase()
    if( label.indexOf(currVal) >= 0 ) {
      cnt++
      $(elem).parents('li').removeClass('d-none')
      $(elem).parent().parent().addClass('match-li')
      $(elem).parents('.multi-nested-list').addClass('search-filter')
    }
  })

  if( count == 0 ) {
    $('.class-without-tree.no-result').removeClass('d-none')
  } else {
    $('.class-without-tree.no-result').addClass('d-none')
  }

  if( cnt == 0 ) {
    $('.class-with-tree.no-result').removeClass('d-none')
  } else {
    $('.class-with-tree.no-result').addClass('d-none')
  }
}

function showTabsDropdown() {
  if ($(window).width() < 768){
    $(document).on('click', function(e){
      $(".nav-tabs").removeClass("show-dropdown");
    });

    $('.dropdown-wrap .mob-dropdown').on('click', function(e){
      e.stopPropagation();
      $(this).parent().find(".nav-tabs").addClass("show-dropdown");
    });

    $(".nav-tabs .nav-link").on('click', function(){
      var selectedText = $(this).text();
      $('.dropdown-wrap .mob-dropdown .text').html(selectedText);
      $(".nav-tabs").removeClass("show-dropdown");
    });

  } else {
    $(".nav-tabs").removeClass("show-dropdown");
  }
}

function calcTocHeight() {
  if ($(window).width() > 767){
    var windowHeight = $( window ).height();

    var getTocTop = parseInt($('.bd-toc').css("top"));

    var calcTocMaxHeight = windowHeight - getTocTop;

    $('.bd-toc .toc-nav').css("max-height", calcTocMaxHeight);
    $('.bd-toc').css("height", calcTocMaxHeight);
  } else {
    $('.bd-toc').removeAttr("style");
    $('.bd-toc .toc-nav').removeAttr("style");
  }
}

function calcMainContainerTop() {
  $('.main-container').removeAttr("style");

  var gdprShow = $(".gdpr-panel").hasClass("d-none")
  var gdprPanelHeight = gdprShow ? 0 : $(".gdpr-panel").innerHeight()
  var headerHeight = $(".header").innerHeight()

  var mainContainerTop = headerHeight + gdprPanelHeight;
  $('.main-container').css("padding-top", mainContainerTop);
}

function detectIEBrowser() {
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent) || navigator.userAgent.indexOf("Trident/") > -1 ){
    $("body").addClass("ie");
  }
}
