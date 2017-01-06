// require the various encryption and authentication modules
var nJwt = require('njwt');
var secureRandom = require('secure-random');
var bcrypt = require('bcrypt-nodejs');
var atob = require('atob');

// require the database
var db = require("./Models");

// export the authentication object
module.exports = {

	ready: false, // used so we don't start the server until this object is ready
	signingKey: null, // the app's signing key for Jwt authentication

	// login the indicated user; b64string is the base64 encoded username:password pair
	login: function(b64string, create, scope) {

		// unencode the string and extract the username and password from it
		var unenc = atob(b64string);
		var arry = unenc.split(":");
		var username = arry[0];
		var password = arry[1];

		var self = this; // convenience reference

		// return a promise for when we have completed the login
		return new Promise(function(resolve, reject) {

			// TBD this needs to be better validation
//			if (username === null || username === "" || typeof username != string) reject(new Error("Username invalid!")); // validate username
//			if (password === null || password === "" || typeof password != string) reject(new Error("Password invalid!")); // validate password

			// use bcrypt to hash the password
			bcrypt.hash(password, null, null, function(err, hash) {

				// see if this user is already in the database
				db.Account.findOne({ where: { name: username } }).then(function(account) {
					// if the user is not in the db then create them there
					if (account === null) {
						// throw an error if account didn't exist and we weren't asked to create it
						if (!create) {
							reject(new Error("No account found for User name: " + username));
						}
						// create the new user account with the specified scope
						db.Account.create({
							name: username,
							passHash: hash,
							scope: scope
						// after creating the user in the db, create the Jwt and resolve the promise
						}).then(function(account) {
							var token = self.createJwt(account);
							resolve({ token: token, account: account });
						});
					// if the user is in the db and the password hash matches, create the Jwt and resolve the promise
					} else {
						bcrypt.compare(password, account.passHash, function(err, result) {
							if (result) {
								var token = self.createJwt(account);
								resolve({ token: token, account: account });
							// handle user name and password mismatch
							} else {
								reject(new Error("User name and password don't match"));
							}
						});
					};

				// handle any db errors
				}).catch(function(err) { console.log(err); });

			});

		});

	},

	// authenticate the user with the supplied Jwt
	authenticate: function(token) {

		var self = this; // convenience reference

		// return a promise for when we have completed the authentication
		return new Promise( function(resolve, reject) {

			// verify the provided token
			nJwt.verify(token,self.signingKey,function(err,verifiedJwt){
			  if(err){
			    reject(err); // Token has expired, has been tampered with, etc 
			  }else{
			    resolve(verifiedJwt.body); 
			  }
			});

		});

	},

	// initialize the authentication function at app startup; it must be ready before the server is
	// started to process requests
	init: function() {

		var self = this; // convenience reference

		// return a promise for when initialization is complete
		return new Promise( function(resolve, reject) {

			// get the app startup data from the database
			db.Serviceapp.findAll({}).then(function(results) {

				// if we already have a signing key then load it from the database and resolve the promise
				if (results.length == 1 && results[0].Secret != null) {
					self.signingKey = results[0].Secret;
					self.ready = true;
					resolve();
				// if we don't already have a signing key, then generate one, store it in the database and resolve the promise
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

	// create a Jwt for the specified user and with the specified scope
	createJwt: function (account) {

		var claims = {
		  iss: "http://serviceapp.com/", // the URL of the app
		  sub: account.id, // the UID of the user
		  username: account.name, // the name of the user
		  scope: account.scope // the scope the user has in the app
		}

		// the create is synchronous
		return nJwt.create(claims,this.signingKey).compact();

	}

};
