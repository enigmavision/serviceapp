// Require the app's authentication module
var auth = require("../authentication.js");

// require the database
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

	// take care of any actions which happen on all requests
	app.use("/", function(req, res, next) {

		// handle any requests for the favicon
		if (req.path === "/favicon.ico") {
			res.end(); // just ignore them for now
			return;
		};

		// handle any requests for public assets
		if (req.path === "/assets") {
			next(); // just pass them through
			return;
		};

		// all requests from the base url are routed to the login page
		if (req.path === "/") {
			res.redirect("/login");
		// all other requests execept to load the login, addUser and addProvider pages are authenticated
		// and passed through to the next handler
		} else {

			console.log("req.path = " + req.path);

			// if we're just trying to load the login, addUser or addProvider page, send the request along and we're done
			if ((req.path === "/login" || req.path === "/addUser" || req.path === "/addProvider")
				&& req.method === "GET") {
				next();
				return;
			}

			// if we don't have an Authorization field in the header then do nothing XXXXredirect to the login page
			if (req.header("Authorization") == null) {
				console.log("invalid null authorization");
				res.end();
				//res.redirect("/login");
			}

			// if the Authorization field is Basic then this must be a login attempt
			if (req.header("Authorization").substring(0, 5) === "Basic") {
				var create = false;
				var scope = "";
				if (req.path === "/addUser") {
					create = true;
					scope = "User";
				}
				if (req.path === "/addProvider") {
					create = true;
					scope = "Provider";
				}
				auth.login(req.header("Authorization").substring(6), create, scope).then(function(results) {
					console.log("we've logged in " + req.path);
					if (req.path === "/addUser") {
						console.log("req.body.email: " + req.body.email);
						console.log("req.body.address: " + req.body.address);
						console.log("req.body.zipcode: " + req.body.zipcode);
						console.log("req.body.avatar: " + req.body.avatar);
						//console.log(results.account);
						// create the user info record
						db.User.create({
							email: req.body.email,
							address: req.body.address,
							zipcode: req.body.zipcode,
							avatar: req.body.avatar
						// and then set the foreign key to it in the accounts table
						}).then(function(user) {
							console.log("we create it");
							results.account.UserId = user.id;
							results.account.save();
						}).catch(function(err) {
							console.log("we got a sequelize error");
						});
					}
					res.header("Authorization", results.token);
					res.locals.userid = results.account.id;
					res.locals.username = results.account.name;
					res.locals.scope = results.account.scope;
					next();
				});
			// if the Authorization field is Bearer then they have sent a token
			} else if (req.header("Authorization").substring(0, 6) === "Bearer") {
				var token = req.header("Authorization").substring(7);
				auth.authenticate(token).then(function(results) {
					res.header("Authorization", results.token);
					res.locals.userid = results.claims.id;
					res.locals.username = results.claims.name;
					res.locals.scope = results.claims.scope;
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

	// handle requests to GET the addUser page
	app.get("/addUser", function(req, res) {

		// send the addUser page
		res.sendFile("editAddUser.html", { root: process.cwd() + '/public/' } , function (err) {
			if (err) {
			  console.log(err);
			  res.status(err.status).end();
			}
			else {
			  console.log('Sent: editAddUser.html');
			}
		});

	});

	// handle requests to GET the addProvider page
	app.get("/addProvider", function(req, res) {

		// send the addProvider page
		res.sendFile("editAddProvider.html", { root: process.cwd() + '/public/' } , function (err) {
			if (err) {
			  console.log(err);
			  res.status(err.status).end();
			}
			else {
			  console.log('Sent: editAddProvider.html');
			}
		});

	});

	// this is where actual login requests will come after successful login
	app.post("/addUser", function(req, res) {

		// this is where we need to redirect to the appropriate landing page depending
		// on the scope granted the user during login
		res.send("SUCCESS! Auth token issued.");

	});

	// this is where actual login requests will come after successful login
	app.post("/addProvider", function(req, res) {

		// this is where we need to redirect to the appropriate landing page depending
		// on the scope granted the user during login
		res.send("SUCCESS! Auth token issued.");

	});

	// this is where actual login requests will come after successful login
	app.post("/login", function(req, res) {

		switch (res.locals.scope) {
			case "User":
				console.log("User login");
				break;
			case "Provider":
				console.log("Provider login");
				break;
			default:
				console.log("Unknown login")
		}	

		// this is where we need to redirect to the appropriate landing page depending
		// on the scope granted the user during login
		res.send("SUCCESS! Auth token issued.");

	});

};