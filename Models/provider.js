module.exports = function(sequelize, DataTypes) {
  var provider = sequelize.define("Provider", {
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, 
  {
   classMethods: {
     associate: function(models) {
       models.Provider.hasOne(models.Account);
     }
   }
  });

  return provider;

};
