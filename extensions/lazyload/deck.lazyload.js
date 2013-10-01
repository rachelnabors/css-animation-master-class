(function($, deck, undefined) {
  var $deck = $[deck];
  var $d = $(document);
  
  var loadEvent = "deck.load";
  
  $.extend(true, $deck.defaults, {
    classes : {
      lazyLoadMarker: "lazyload"
    },
    lazyload: {
      slidePath: "slides",
      urlPrefix: "",
      urlSuffix: ".html",
      filterAttr: "data-filter"
    }
  });
  
  function loadSlide($slide){
    var opts = $deck('getOptions');
    if($slide.hasClass(opts.classes.lazyLoadMarker)){
      $slide.removeClass(opts.classes.lazyLoadMarker);
      var url = "";
      if(opts.lazyload.slidePath){
        url += opts.lazyload.slidePath + "/";
      }
      
      url += opts.lazyload.urlPrefix +
        $slide.attr('id') +
        opts.lazyload.urlSuffix;
      
      var filter = $slide.attr(opts.lazyload.filterAttr);
      if(filter){
        url += " " + filter;
      }
      console.log("loading " + url);
      $slide.load(url, function(){

        $[deck]('.slide');
      });
    }
  }
  
  $d.bind('deck.init', function(){
    var opts = $deck('getOptions');
    var slides = $deck('getSlides');
    
    loadSlide($[deck]('getSlide'));
  });
  
  
  
  $d.bind('deck.becameCurrent', function(ev){
    loadSlide($(ev.target));
  }).bind('deck.becamePrevious', function(ev){
    loadSlide($(ev.target));
  }).bind('deck.becameNext', function(ev){
    loadSlide($(ev.target));
  });
  
})(jQuery, 'deck');