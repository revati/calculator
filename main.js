(function($) {
  var calculateValue = function(e) {
    e.preventDefault();
    var input = $("[name=\"equation\"]").val();

    try {
      var value = eval( input );
      $("#result").text( value );
    }
    catch(e) {
      $("#result").text( "Error" );
    }
  };

  // Add listener
  $("form").on("submit", calculateValue);
  $("[name=\"equation\"]").on("keyup", calculateValue);
})(jQuery);