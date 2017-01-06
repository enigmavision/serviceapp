// Code here handles what happens when a user submits a new Service Request on the form.
// Effectively it takes the form inputs then sends it to the server to save in the DB.

// when user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // make a serviceRequest obj
  var serviceRequest = {
    // name from name input
    name: $("#name").val().trim(),
    // role from role input
    email: $("#email").val().trim(),
    // address from address input
    address: $("#address").val().trim(),
    // numberOfBedrooms from numberOfBedrooms input
    numberOfBedrooms: $("#numberOfBedrooms").val().trim(),
    // sqrFootage from sqrFootage input
    sqrFootage: $("#sqrFootage").val().trim(),
    // numberofBathrooms from numberofBathrooms input
    numberofBathrooms: $("#numberofBathrooms").val().trim(),
    // floors from floors input
    floors: $("#floors").val().trim(),
    // windowCleaning from windowCleaning input
    windowCleaning: $("#windowCleaning").val().trim(),
    // kitchen from kitchen input
    kitchen: $("#kitchen").val().trim(),
    // laundry from laundry input
    laundry: $("#laundry").val().trim(),
  };

  // send an AJAX POST-request with jQuery
  $.post("/api/new", serviceRequest)
    // on success, run this callback
    .done(function(data) {
      // log the data we found
      console.log(data);
      // tell the user we're Requesting a Service with an alert window
      alert("Requesting Service......");
    });

  // empty each input box by replacing the value with an empty string
  $("#name").val("");
  $("#email").val("");
  $("#address").val("");
  $("#numberOfBedrooms").val("");
  $("#sqrFootage").val("");
  $("#numberofBathrooms").val("");
  $("#floors").val("");
  $("#windowCleaning").val("");
  $("#kitchen").val("");
  $("#laundry").val("");
});
