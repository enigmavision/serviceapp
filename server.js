// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// Routes =============================================================

// require("./routes/html-routes.js")(app);
// require("./routes/connection.js")(app);
//require("./routes/routes.js")(app); // just for handling authentication right now

// Requiring our models for syncing
var db = require("./Models");

// Requiring the authentication module for the app
//var auth = require("./authentication.js");

// Any initialization requiring persisted data from the database is done here
db.sequelize.sync({force: true}).then(function() {

	//auth.init().then(startServer);
	startServer();

});

// this function will be called by all initialization functions when they are
// complete, but it will not actually start the server until all of the initialization
// functions have completed
function startServer() {

	//if (auth.ready === false) return;

	app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);

	});

}
