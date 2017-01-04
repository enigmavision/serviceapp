var users = require("../data/users.js");
var providers = require("../data/providers.js");
var reviews = require("../data/reviews.js");
var serviceRequests = require("../data/serviceRequests.js");  

module.exports = function(app){


	app.get("/api/user", function(req, res){

		res.render("userProfile", {})

	
	});

	app.get("/api/provider", function(req, res){

		res.json(providers);
	
	});

	app.get("/api/review", function(req, res){

		res.json(reviews);
	
	});

	app.get("/api/servicerequests", function(req, res){

		res.json(serviceRequests);
	
	});



}