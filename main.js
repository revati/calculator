(function($) {

  var pendingAction;
  var pendingNumber;
  var displayNumber;
  var lastActionIsEquals = false;

  // Aprēķina jauno vērtību no diviem skaitļiem un darbības
  var calculate = function(num1, num2, action) {
    var value;

    if(action == "+") {
      value = parseFloat(num1) + parseFloat(num2);
    }
    else if(action == "-") {
      value = num1 - num2;
    }
    else if(action == "*") {
      value = num1 * num2;
    }
    else if(action == "/") {
      value = num1 / num2;
    }

    return value;
  }

  // Atgriež jauno vērtību, ko rādīt displejā, balstoties uz
  var newDisplayNumber = function(currentValue, change) {
    // Tikai viens simbols katru reizi
    if(change.length > 1) {
      // Ja ir vairāki, tad ir haks, ignorēt šādu scenāriju
      // Atgriežam iepriekšējo vētību
      return currentValue;
    }

    // Ja currentValue nav noteikts, tad pieņemt, ka ir tukš
    if(currentValue === undefined) {
      // Ja tiek pievienots punkts
      if(change.isDot()) {
        return "0.";
      }

      currentValue = "";
    }

    // Ja jaunais cipars ir punkts un iepriekš jau tika pievienots punkts
    // Karo4, drīkst būt tikai viens punkts
    if(currentValue.containsDot() && change.isDot()) {
      // Ignorēt jauna punkta pievienošanu
      // Atgriežam iepriekšējo vētību
      return currentValue;
    }

    return currentValue + change;
  };

  var updateDisplayValue = function() {
    // Ja jau ir otrs skaitlis un darbība, kas jāveic, tad veikt
    if(pendingNumber && pendingAction) {
      displayNumber = calculate(pendingNumber, displayNumber, pendingAction);

      // Parādīt jauno vērtību
      $("#result").text(displayNumber);
    }
  }

  // Katru reizi, kad uzspiež kādu no cipariem
  $(".container").on("click", ".number", function(e) {
    e.preventDefault();

    displayNumber = newDisplayNumber( displayNumber, $(this).val() );

    $("#result").text(displayNumber);
  });

  // Katru reizi, kad uzspiež kādu no darbībām
  $(".action").on("click", function(e) {
    e.preventDefault();

    if(!lastActionIsEquals) {
      updateDisplayValue();
    }

    lastActionIsEquals = false;

    // Saglabāt pendingAction tagad izvēlēto tēmu
    pendingAction = $(this).val();

    // Saglabāt displayNumber kā pendingNumber
    pendingNumber = displayNumber;

    // Nomainīt displayNumber uz tukšu
    displayNumber = undefined;
  });

  // Katru reizi, kad uzspiež uz = pogas
  $(".equals").on("click", function(e) {
    e.preventDefault();

    // Samainīt vietā displayNumber un pendingNumber vērtības.
    // Jo visu laiku spiežot = pogu kalkulātoram jāturpina iepriekšējā darbība
    // Mainīšana nepieciešama tikai pirmo reizi, kad uzspiež = pogu pēc kādas citas darbības pogas.
    if(!lastActionIsEquals) {
      lastActionIsEquals = true;

      var currentNumber = displayNumber;

      displayNumber = pendingNumber;
      pendingNumber = currentNumber;
    }

    updateDisplayValue();
  });
})(jQuery);

String.prototype.containsDot = function() {
  return this.indexOf(".") !== -1;
};

String.prototype.isDot = function() {
  return this == ".";
};