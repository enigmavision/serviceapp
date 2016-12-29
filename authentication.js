var nJwt = require('njwt');
var secureRandom = require('secure-random');
var bcrypt = require('bcrypt-nodejs');
var atob = require('atob');

var db = require("./models");

module.exports = {

	ready: false,
	scope: [],
	signingKey: null,

	login: function(b64string) {

		var unenc = atob(b64string);
		console.log(unenc);

		var arry = unenc.split(":");
		var username = arry[0];
		var password = arry[1];

		console.log("in the login" + " " + username + " " + password);

		var self = this;

		return new Promise(function(resolve, reject) {

			// TBD this needs to be better validation
//			if (username === null || username === "" || typeof username != string) reject(new Error("Username invalid!")); // validate username
//			if (password === null || password === "" || typeof password != string) reject(new Error("Password invalid!")); // validate password

			console.log("before hashing");
			bcrypt.hash(password, null, null, function(err, hash) {
				console.log("where's the hash? " + " " + typeof hash + " " + hash);

				db.User.findOne({ where: { name: username }, attributes: ["name", "passHash", "scope"] }).then(function(results) {

					if (results === null) {
						var scope = "User";
						db.User.create({
							name: username,
							passHash: hash,
							scope: scope
						}).then(function() {
							console.log("created new user record");
							var token = self.createJwt(username, scope);
							resolve({ token: token, scope: scope });
						});
					} else if (results[0].passHash === hash) {
						var token = self.createJwt(results[0].name, results[0].scope);
						resolve({ token: token, scope: results[0].scope });
					} else {
						reject(new Error("User name and password don't match"));
					};

				}).catch(function(err) { console.log(err); });

			});

		});

	},

	authenticate: function(token) {

		var self = this;

//		var hash = bcrypt.hashSync("bacon");
		 
		//bcrypt.compareSync("bacon", hash); // true
//		console.log("bacon is " + bcrypt.compareSync("bacon", hash));
		//bcrypt.compareSync("veggies", hash); // false
//		console.log("veggies is " + bcrypt.compareSync("veggies", hash));

		return new Promise( function(resolve, reject) {

/*			 
			var claims = {
			  iss: "http://myapp.com/",  // The URL of your service 
			  sub: "users/user1234",    // The UID of the user in your system 
			  scope: "self, admins"
			}
			 
			var jwt = nJwt.create(claims,self.signingKey);

			var token = jwt.compact();
*/

			nJwt.verify(token,self.signingKey,function(err,verifiedJwt){
			  if(err){
			    reject(err); // Token has expired, has been tampered with, etc 
			  }else{
			    resolve({ token: token, scope: verifiedJwt.body.scope }); 
//			    resolve(verifiedJwt); // Will contain the header and body 
			  }
			});

		});

	},

	init: function() {

		var self = this;

		return new Promise( function(resolve, reject) {

			db.Serviceapp.findAll({}).then(function(results) {

				if (results.length == 1 && results[0].Secret != null) {
				  console.log("we already have a secret");		
					self.signingKey = results[0].Secret;
					self.ready = true;
					resolve();
				} else {
					self.signingKey = secureRandom(256, {type: 'Buffer'}); // Create a highly random byte array of 256 bytes 
					db.Serviceapp.create({
						Secret: self.signingKey
					}).then(function() {
						self.ready = true;
						resolve();
					});
				}

			});

		});

	},

	createJwt: function (username, scope) {

		var claims = {
		  iss: "http://serviceapp.com/",  // The URL of your service 
		  sub: username,    // The UID of the user in your system 
		  scope: scope
		}
		 
//		var jwt = nJwt.create(claims,this.signingKey);
//		console.log(jwt);

//		var token = jwt.compact();
//		console.log(token);

		return nJwt.create(claims,this.signingKey).compact();

	}

};
