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


















})