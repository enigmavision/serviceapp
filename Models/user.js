module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("User", {
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, 
  {
   classMethods: {
     associate: function(models) {
       models.User.hasOne(models.Account);
     }
   }
  });

  return user;

};
