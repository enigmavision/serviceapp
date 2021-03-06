module.exports = function(sequelize, DataTypes) {
  var serviceRequest = sequelize.define("serviceRequest", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    numberOfBedrooms: DataTypes.INTEGER,
    sqrFootage: DataTypes.INTEGER,
    numberofBathrooms: DataTypes.INTEGER,
    floors: DataTypes.BOOLEAN,
    windowCleaning: DataTypes.BOOLEAN,
    kitchen: DataTypes.BOOLEAN,
    laundry: DataTypes.BOOLEAN

  });

  return serviceRequest;

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
//   return service;
// };
