var searchConfig = {
    segment : undefined
  };

var st_engineID = document.currentScript.getAttribute('engineID')
// console.log(" Swiftype EngineID ::: ", st_engineID)

var readHighLightedFileds = function() {
    return {'page': {'body': {'fallback': false}}};
}
  
var readFilters = function() {
    if(window.searchConfig.segment === "all_results") {
        return {};
    } else {
        return {page: {segment : window.searchConfig.segment}}
    }
}

/**
reloads the results.
**/
var reloadResults = function() {
    $(window).hashchange();
};
  
$(function() {   
    /**
    On tab change sets searchConfig categories property and reloads the result for selected tab.
    **/
    $('.search-results.custom-tabs .nav-tabs .nav-link').click(function(e) {
      var currentTab = $(e.currentTarget).prop('name');
      if(!window.searchConfig.segment !== currentTab) {
          window.searchConfig.segment = currentTab;
      }
      reloadResults();
    });


    /**
    Custom render function for autocomplete.
    **/
    var customResultRenderFunction = function(ctx, data) {
        var articles = [],
            apiReferences = [];

        $.each(data, function(docType, results) {
            $.each(results, function(idx, result) {
                if (result.category !== "Hidden") {
                    if (result.segment === "articles") {
                        articles.push(result);
                    } else {
                        apiReferences.push(result);
                    }
                }
            });
        });
        var articleTitle = $('<span>Articles</span>')
        var apiReferencesTitle = $('<span>API References</span>')

        var articlesList = $('<ul class="articles"></ul>'),
            apiReferencesList = $('<ul class="apiref"></ul>');
        

        $.each(articles, function(idx, item) {
          ctx.registerResult($('<li class="result"><a href=' +item['url'] + '>' + item['title'] +'</a></li>').appendTo(articlesList), item);
        });

        $.each(apiReferences, function(idx, item) {
          ctx.registerResult($('<li class="result"><a href=' + item['url'] +'>' + item['title'] +'</a></li>').appendTo(apiReferencesList), item);
        });

        if (articles.length > 0) {
            articleTitle.appendTo(ctx.list);
            articlesList.appendTo(ctx.list);
        }
        if (apiReferences.length > 0) {
            apiReferencesTitle.appendTo(ctx.list);
            apiReferencesList.appendTo(ctx.list);
        }
        
        
    };

    /**
    Custom render function for search result page
    **/
    var customRenderFunctionResultPage = function(document_type, item) {
      var category = item['category'] || "";
      if (category !== 'Hidden') {
        var body = item['summary'] || item['highlight']['body'] || "";
        var item = "<li><a href='"+item['url']+"'>"+
        "<p class='type'>"+category+"</p>"+
        "<h5>"+item['title']+"</h5>"+
        "<p>"+body+"</p>"
        +"</a>"+
        "</li>" 
      }
      return item;
    };

    /**
    Swiftype Initialization for autocomplete search box in header
    **/
    $('#st-search-input').swiftype({
        engineKey: st_engineID,
        resultRenderFunction: customResultRenderFunction,
        suggestionListType: 'div',
        resultListSelector: '.result',
        filters: {page: {segment : ["articles","api_reference"]}},
        fetchFields: { page: ['title','segment','url','category']}
    });


    /**
    Swiftype Initialization for search page search box and rendering
    **/
    $("#st-search-page-input").swiftypeSearch({
        engineKey: st_engineID,
        renderFunction: customRenderFunctionResultPage,
        fetchFields: {page: ['title','body','category','url','segment', 'summary']},
        resultContainingElement: "#st-results-container",
        filters: readFilters,
        highlightFields: readHighLightedFileds
    });


    /**
    On search box enter redirect to search page: /search
    **/
    $("#search-form").submit(function(event) {
        event.preventDefault();
        var query = $("#st-search-input").val();
        window.location = "/search#stq=" + query;
    });

});