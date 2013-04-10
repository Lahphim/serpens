(function( $ ){
  var methods  = {
    init: function( options ) {
      return this.each(function() {
        var obj = $(this),
            opt = options;
        
        var id       = obj.attr("id"),
            slVal    = obj.find(":selected").val(),
            slTxt    = obj.find(":selected").text(),
            $slBox   = "",
            $dis     = "",
            $ul      = "";
    
        $dis += "<div id='dis-option-" + id + "'><span for='" + slVal + "'>" + slTxt + "</span></div>";
    
        $ul += "<div id='drop-option-" + id + "'><ul for='" + id + "'>";
          $.each(obj.children(), function(idx, val) {
            $ul += "<li for='" + $(val).attr('value') + "'>";
            $ul += $(val).text();
            $ul += "</li>";
          });
        $ul += "</ul></div>";
    
        $slBox += "<div id='select-option-" + id + "' class='hooley-box'>" + $dis + $ul + "</div>";
        
        obj.hide().after(
          $($slBox).css({
            width: opt.width
          })
        ); 
        
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
  
  $.fn.serpens = function( options ) {
    if( typeof options === 'object' || !options ) {
      var defaults = {
        width: 150,
        debug: 'debugging'
      };
      
      var options = $.extend(defaults, options);
      
      return methods.init.apply( this, [options] );
    } else if ( methods[options] ) {
      return methods[options].apply( this );
    }
  };
})( jQuery );