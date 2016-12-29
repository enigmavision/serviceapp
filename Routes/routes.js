// Require the app's authentication module
var auth = require("../authentication.js");

// Routes
// =============================================================
module.exports = function(app) {

	// take care of any actions which happen on all requests
	app.use("/", function(req, res, next) {

		// all requests from the base url are routed to the login page
		if (req.path === "/") {
			res.redirect("/login");
		// all other requests execept to load the login page are authenticated and passed through to the next handler
		} else {

			// if we're just trying to load the login page, send the request along and we're done
			if (req.path === "/login" && req.method === "GET") {
				next();
				return;
			}

			// if we don't have an Authorization field in the header then redirect to the login page
			if (req.header("Authorization") == null) {
				console.log("invalid null authorization");
				res.redirect("/login");
			}

			// if the Authorization field is Basic then this must be a login attempt
			if (req.header("Authorization").substring(0, 5) === "Basic") {
				auth.login(req.header("Authorization").substring(6)).then(function(results) {
					res.header("Authorization", results.token);
					res.scope = results.scope;
					next();
				});
			// if the Authorization field is Bearer then they have sent a token
			} else if (req.header("Authorization").substring(0, 6) === "Bearer") {
				var token = req.header("Authorization").substring(7);
				auth.authenticate(token).then(function(results) {
					res.header("Authorization", results.token);
					res.scope = results.scope;
					next();
				}).catch(function(err) {

				});
			} else {
				// TBD need to add authentication error here
			}

		};

	});

	// handle default requests to the login url
	app.get("/login", function(req, res) {

		// send the login page
		res.sendFile("login.html", { root: process.cwd() + '/public/' } , function (err) {
			if (err) {
			  console.log(err);
			  res.status(err.status).end();
			}
			else {
			  console.log('Sent: login.html');
			}
		});

	});

	// this is where actual login requests will come after successful login
	app.post("/login", function(req, res) {

		// this is where we need to redirect to the appropriate landing page depending
		// on the scope granted the user during login
		res.send("SUCCESS! Auth token issued.");

	});

};