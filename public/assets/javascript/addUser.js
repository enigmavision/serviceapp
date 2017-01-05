// run on document ready
$(function() {

	//Materialize js

	$(".button-collapse").sideNav(); 

	$('select').material_select();

	// add the click handler for the create user button
	$("#addUser").on("click", function() {

    	event.preventDefault();

    	console.log("got the button click");

      // If all required fields are filled
      if (validateForm()) {
        // Create an object for the user's data
        var userData = {
//                      name: $("#name").val(),
          email: $("#email").val(),
//                      password: $("#password").val(),
          address:  $("#address").val(),
          zipcode:  $("#zipCode").val(),
          avatar:   $("#avatar").val()
        };

        console.log(userData);

		// POST the new user data to create them and login
		$.ajax({
			headers: {
			"Authorization": "Basic " + btoa($("#name").val() + ":" + $("#password").val())
  			},
  			data: userData,
			method: "POST"
		}).done(function(data, status, response) {
			alert("The access token is: " + response.getResponseHeader("Authorization"));
		});

	}


/*

            //Capture form inputs

            $("#addUser").on("click", function() {

            	event.preventDefault();

            	console.log("got the button click");



                  // If all required fields are filled
                  if (validateForm()) {
                    // Create an object for the user's data
                    var userData = {
//                      name: $("#name").val(),
                      email: $("#email").val(),
//                      password: $("#password").val(),
                      address:  $("#address").val(),
                      zipcode:  $("#zipCode").val(),
                      avatar:   $("#avatar").val()

                    };

                    console.log(userData);

//                    // Grab the URL of the website
//                    var currentURL = window.location.origin;
//
 //                   console.log(currentURL);

                    // AJAX post the data to the users API.
                    $.post("/addUser", userData, 
                      function(data, status){

                          alert("Data: " + data + "\nStatus: " + status);




                      });



                  }
*/

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

