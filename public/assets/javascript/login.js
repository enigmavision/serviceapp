// run on document ready
$(function() {

	// add the click handler for the login button
	$("#login").on("click", function() {

		// POST the username and password to login
		$.ajax({
			headers: {
			"Authorization": "Basic " + btoa($("#username").val() + ":" + $("#password").val())
  			},
			method: "POST"
		}).done(function(data, status, response) {
			alert("The access token is: " + response.getResponseHeader("Authorization"));
		});

	})

	// add the click handler for the addUser link
	$("#addUser").on("click", function() {

		event.preventDefault();
		$(location).attr('href', '/addUser');

/*
		// GET the addUser page
		$.ajax("/addUser", 
			{ method: "GET"
	}).done(function(data, status, response) {
			console.log("addUser request");

		//$(location).attr('href', '/addUser');

			//alert("The access token is: " + response.getResponseHeader("Authorization"));
		});
*/

	})

	// add the click handler for the addProvider link
	$("#addProvider").on("click", function() {

		$(location).attr('href', '/addProvider');

		// GET the addProvider page
//		$.ajax("/addProvider", {
//			method: "GET"
//		}).done(function(data, status, response) {
//			console.log("addProvider request")
//			//alert("The access token is: " + response.getResponseHeader("Authorization"));
//		});

	})

})