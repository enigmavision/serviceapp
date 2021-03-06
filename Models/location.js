module.exports = function(sequelize, DataTypes) {
  var location = sequelize.define("Location", {
    // Giving the Author model a name of type STRING
    onebedroomapt: DataTypes.STRING,
    twobedroomapt: DataTypes.STRING,
    threebedroomapt: DataTypes.STRING,
    onebathroom: DataTypes.STRING,
    twobathroom: DataTypes.STRING,
    threebathroom: DataTypes.STRING,
    kitchen: DataTypes.STRING,
    familyroom: DataTypes.STRING,
    fullhouse: DataTypes.STRING

  });

  return location;

};
//   // Here we'll pass a second "classMethods" object into the define method
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
// };
