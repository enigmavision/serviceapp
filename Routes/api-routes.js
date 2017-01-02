var users = require("../Data/users.js");


module.exports = function(app){


	app.get("/api/users", function(req, res){

		res.json(users);
	
	});


}