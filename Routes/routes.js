// Require the app's authentication module
var auth = require("../authentication.js");

// require the database
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

	// take care of any actions which happen on all requests, mainly authentication
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

			// if we're just trying to load the login, addUser or addProvider page, send the request along and we're done
			if ((req.path === "/login" || req.path === "/addUser" || req.path === "/addProvider")
				&& req.method === "GET") {
				next();
				return;
			}

			// if we don't have a jwt cookie, then this is either a login, addUser or addProvider POST request, or
			// it's an unauthorized access. handle that case here
			if (typeof req.cookies.jwt === "undefined") {

				// if this request is not a POST to login or create a new user or provider, it is an
				// unauthorized access and is terminated
				if ((req.path !== "/login" && req.path !== "/addUser" && req.path !== "/addProvider")
					|| req.method !== "POST") {
					res.header("WWW-Authenticate", 'Basic realm="User Visible Realm"');
					res.sendStatus(401); // Unauthorized access
					return;
				}

				// we must have a valid Authorization field with a Basic tag and encrypted user name and password
				// in the request header in order to complete the login or create a new User or Provider
				//if (req.header("Authorization").substring(0, 5) === "Basic") {
				if (req.header("Authorization").substring(0, 5) === "Basic") {

					var create = false; // default is logon
					var scope = ""; // this will be set when the account is found or created

					// if we are creating a new User or Provider, set the create and scope vars appropriately
					if (req.path === "/addUser") {
						create = true;
						scope = "User";
					}
					if (req.path === "/addProvider") {
						create = true;
						scope = "Provider";
					}

					// call the authentication login function. it will create a new account with the specified
					// scope if specified. regardless, if the function is successful the account will be logged in
					auth.login(req.header("Authorization").substring(6), create, scope).then(function(results) {

						// save the important account info for access by any other middleware down the line
						res.locals.userid = results.account.id;
						res.locals.username = results.account.name;
						res.locals.scope = results.account.scope;

						// save the authentication token from the login as a cookie on the client
						res.cookie("jwt", results.token);
						
						// if this was just a login to an existing user account we can just
						// move on down the line
						if (req.path === "/login") {
							// head to the next route
							next();
							return;
						}
						
						// if we created a new user account, add a new info record to the User table and relate
						// it to the newly created account
						if (req.path === "/addUser") {
							// create the user info record
							db.User.create({
								email: req.body.email,
								address: req.body.address,
								zipcode: req.body.zipcode,
								avatar: req.body.avatar
							// and then set the foreign key to it in the accounts table
							}).then(function(user) {
								results.account.UserId = user.id;
								results.account.save();
								// head to the next route
								next();
								return;
							}).catch(function(err) {
								console.log("Sequelize error: " + err);
							});
						}
						
						// if we created a new provider account, add a new info record to the Provider table and relate
						// it to the newly created account
						if (req.path === "/addProvider") {
							// create the provider info record
							db.Provider.create({
								email: req.body.email,
								address: req.body.address,
								zipcode: req.body.zipcode,
								avatar: req.body.avatar
							// and then set the foreign key to it in the accounts table
							}).then(function(provider) {
								results.account.ProviderId = provider.id;
								results.account.save();
								// head to the next route
								next();
								return;
							}).catch(function(err) {
								console.log("Sequelize error: " + err);
							});
						}

					});

				}

			}

			// finally, if we got here we are not trying to go to a login route and also do have a jwt cookie
			// so let's try to authenticate it
			auth.authenticate(req.cookies.jwt).then(function(claims) {
				res.locals.userid = parseInt(claims.sub);
				res.locals.username = claims.username;
				res.locals.scope = claims.scope;
				next();
				return;
			}).catch(function(err) {
				// TBD need to add authentication error here if we can't authenticate the token
			});

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

	// this is where add User requests will come after new User creation
	app.post("/addUser", function(req, res) {

		console.log("new user account added; id: " 
			+ res.locals.userid + "; name: " 
			+ res.locals.username + "; scope: " 
			+ res.locals.scope);

		res.end();

	});

	// this is where add Provider requests will come after new Provider creation
	app.post("/addProvider", function(req, res) {

		console.log("new provider account added; id: " 
			+ res.locals.userid + "; name: " 
			+ res.locals.username + "; scope: " 
			+ res.locals.scope);

		res.end();

	});

	// this is where actual login requests will come after successful login
	app.post("/login", function(req, res) {

		switch (res.locals.scope) {
			case "User":
				console.log("User login");
				res.json({ scope: "User" });
				break;
			case "Provider":
				console.log("Provider login");
				res.json({ scope: "Provider" });
				break;
			default:
				console.log("Unknown login")
				res.json({ scope: "Unknown" });
		}	

	});

	app.get("/user", function(req, res){

		db.Account.findById(res.locals.userid, { include: [ db.User ] }).then(function(account) {
			account.getUser().then(function(user) {
				res.render("userProfile", {
					name: account.name, 
					email: user.email, 
					address: user.address, 
					zipcode: user.zipcode, 
					avatar: user.avatar   
				});
			});
		});
	
	});

	app.get("/provider", function(req, res){

		db.Account.findById(res.locals.userid, { include: [ db.Provider ] }).then(function(account) {
			account.getProvider().then(function(provider) {
				res.render("providerProfile", {
					name: account.name, 
					email: provider.email, 
					address: provider.address, 
					zipcode: provider.zipcode, 
					avatar: provider.avatar   
				});
			});
		});
	
	});

/*
	app.get("/api/review", function(req, res){

		res.json(reviews);
	
	});

	app.get("/api/servicerequests", function(req, res){

		res.json(serviceRequests);
	
	});
*/

};