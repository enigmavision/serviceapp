module.exports = function(sequelize, DataTypes) {
  var quote = sequelize.define("Quote", {
    // Giving the Author model a name of type STRING
    Price: DataTypes.STRING,
    Provider: DataTypes.STRING,
    User: DataTypes.STRING,
    Location: DataTypes.STRING,
    Duration: DataTypes.STRING,
    Date: DataTypes.STRING

  });
  return quote;

  };

  // Here we'll pass a second "classMethods" object into the define method
//   // This is for any additional configuration we want to give our models
//     {
//       // We're saying that we want our Author to have Posts
//       classMethods: {
//         associate: function(models) {
//           // Associating Author with Posts
//           Author.hasMany(models.Post);
//         }
//       }
//     });
//   return quote;
//
// };
