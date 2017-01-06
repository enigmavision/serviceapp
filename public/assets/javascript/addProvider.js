// run on document ready
$(function() {

	//Materialize js

	$(".button-collapse").sideNav(); 

	$('select').material_select();

	// add the click handler for the create user button
	$("#addProvider").on("click", function() {

    	event.preventDefault();

      // If all required fields are filled
      if (validateForm()) {
        // Create an object for the provider's data
        var providerData = {
          email: $("#email").val(),
          address:  $("#address").val(),
          zipcode:  $("#zipCode").val(),
          avatar:   $("#avatar").val()
        };

        // remove any existing jwt cookie before logging in
        $.removeCookie('jwt', { path: '/' });

    		// POST the new provider data to create them and login
    		$.ajax({
    			headers: {
    			"Authorization": "Basic " + btoa($("#name").val() + ":" + $("#password").val())
      			},
      			data: providerData,
    			method: "POST"
    		}).done(function(data, status, response) {
          // redirect to the provider profile page
          $(location).attr('href', '/provider');
    		});

	     }

    });

});


// Form validation
function validateForm() {
  $(".validate").each(function() {
  	console.log($(this).val());
    if ($(this).val() === "") {
    	alert("Please fill out all fields before submitting!");
      return false;
    }
  });
  if ($("#password").val() !== $("#confirmPassword").val()) {
    	alert("Password confirmation does not match");
      return false;
  }
  return true;
}

