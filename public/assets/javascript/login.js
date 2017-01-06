// run on document ready
$(function() {

	// add the click handler for the login button
	$("#login").on("click", function() {

		event.preventDefault();

		// remove any existing jwt cookie before logging in
		$.removeCookie('jwt', { path: '/' });

		// POST the username and password to login
		$.ajax({
			headers: {
			"Authorization": "Basic " + btoa($("#username").val() + ":" + $("#password").val())
  			},
			method: "POST"
		}).done(function(data, status, response) {
			switch (data.scope) {
				case "User":
					console.log("User login");
					// redirect to the user profile
					$(location).attr('href', '/user');
					break;
				case "Provider":
					console.log("Provider login");
					// redirect to the user profile
					$(location).attr('href', '/provider');
					break;
				default:
					console.log("Unknown login")
					alert("Unknown login scope")
			}	
		});

	})

	// add the click handler for the addUser link
	$("#addUser").on("click", function() {

		event.preventDefault();

		// redirect to the addUser page
		$(location).attr('href', '/addUser');

	})

	// add the click handler for the addProvider link
	$("#addProvider").on("click", function() {

		event.preventDefault();

		// redirect to the add Provider page
		$(location).attr('href', '/addProvider');

	})

})