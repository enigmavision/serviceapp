var users = require("../data/users.js");
var providers = require("../data/providers.js");
//var reviews = require("../data/reviews.js");
var serviceRequests = require("../data/serviceRequests.js");  

//Dummy User Data Object 
var userData = {
	
	name: "John Doe",
	email: "jdoe@gmail.com",
	password: "iamanderson1",
	cpassword: "iamanderson1",
	address: "126 Main Street",
	zipcode: "98922",
	avatar: "http://i2.cdn.cnn.com/cnnnext/dam/assets/160825160953-05-week-in-photos-0826-super-169.jpg",

};

module.exports = function(app){


	app.get("/user", function(req, res){

		res.render("userProfile", {
			
			name: userData.name, email: userData.email, address: userData.address, zipcode: userData.zipcode, avatar: userData.avatar   
			
			});

	
	});

	app.get("/provider", function(req, res){

		res.render("providerProfile",{
			name: userData.name, 
			email: userData.email, 
			address: userData.address, 
			zipcode: userData.zipcode, 
			avatar: userData.avatar  

		});
	
	});

	
	app.get("/servicerequests", function(req, res){

		res.json(serviceRequests);
	
	});


}