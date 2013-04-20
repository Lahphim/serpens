(function( $ ){
  var methods  = {
    init: function( options ) {
      return this.each(function() {
        var obj = $(this),
            opt = options,
            $slBox  = $.fn.serpens.structure( obj, opt );
        
        obj.hide().after( $slBox ); 
        
      });
    },
    
    destroy: function() {
      $(this).show();
      $(this).next().remove();
      
      return true;
    },
    
    getSelected: function() {
      var $selected = $(this).find(':selected');
      
      return {
        value: $selected.val(),
        text: $selected.text()
      }
    },
    
    debug: function() {
      return this;
    }
  }
  
  // plugin definition
  $.fn.serpens = function( options ) {
    if( typeof options === 'object' || !options ) {
      var options = $.extend($.fn.serpens.defaults, options);
      
      return methods.init.apply( this, [options] );
    } else if ( methods[options] ) {
      return methods[options].apply( this );
    }
  };

  $.fn.serpens.structure = function( obj, opt ) {
    var id       = obj.attr("id"),
        slVal    = obj.find(":selected").val(),
        slTxt    = obj.find(":selected").text(),
        $slBox   = "",
        $dis     = "",
        $ul      = "";

    $dis += "<div class='display-option'><span for='" + slVal + "'>" + slTxt + "</span></div>";

    $ul += "<div class='drop-option'><ul for='" + id + "'>";
      $.each(obj.children(), function(idx, val) {
        $ul += "<li for='" + $(val).attr('value') + "'>";
        $ul += $(val).text();
        $ul += "</li>";
      });
    $ul += "</ul></div>";

    $slBox += "<div id='select-option-" + id + "' class='serpens-box'>" + $dis + $ul + "</div>";
    
    return $($slBox).css({
      width: opt.width
    }); 
  }

  // plugin defaults for this plugin
  $.fn.serpens.defaults = {
    width: 150
  }
})( jQuery );