(function($) {
  var calculateValue = function(e) {
    e.preventDefault();
    var input = $("[name=\"equation\"]").val();
    var value = eval( input );

    $("#result").text( value );
  };

  // Add listener
  $("form").on("submit", calculateValue);
  $("[name=\"equation\"]").on("keyup", calculateValue);
})(jQuery);