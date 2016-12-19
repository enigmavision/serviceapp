module.exports = function(sequelize, DataTypes) {
  var service = sequelize.define("Service", {
    // Giving the Author model a name of type STRING
    lightcleaning: DataTypes.STRING,
    floors: DataTypes.STRING,
    bedrooms: DataTypes.STRING,
    windowcleaning: DataTypes.STRING,
    kitchen: DataTypes.STRING,
    bathroom: DataTypes.STRING

});

  return service;

};  // Here we'll pass a second "classMethods" object into the define method
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
//   return service;
// };
