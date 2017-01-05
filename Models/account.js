module.exports = function(sequelize, DataTypes) {
  var account = sequelize.define("Account", {
	name: DataTypes.STRING,
    passHash: DataTypes.STRING,
    scope: DataTypes.STRING

  });

  return account;

};
// Here we'll pass a second "classMethods" object into the define method
// This is for any additional configuration we want to give our models
//     {
//       // We're saying that we want our Author to have Posts
//       classMethods: {
//         associate: function(models) {
//           // Associating Author with Posts
//           Author.hasMany(models.Post);
//         }
//       }
//     });
//   return user;
// };
