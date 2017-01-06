// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Allows the backend to simulate a DELETE and PUT 
app.use(methodOverride('_method'));

//Setting up handlebars
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Adds cookie support
app.use(cookieParser());

// Static directory
app.use(express.static("./public"));

// Routes =============================================================
require("./Routes/routes.js")(app);

// Requiring our models for syncing
var db = require("./Models");

// Requiring the authentication module for the app
var auth = require("./authentication.js");

// Any initialization requiring persisted data from the database is done here
db.sequelize.sync({force: true}).then(function() {

	auth.init().then(startServer);

});

// this function will be called by all initialization functions when they are
// complete, but it will not actually start the server until all of the initialization
// functions have completed
function startServer() {

	if (auth.ready === false) return;

	app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);

	});

}
