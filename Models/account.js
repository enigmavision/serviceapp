module.exports = function(sequelize, DataTypes) {
  var account = sequelize.define("Account", {
	 name: DataTypes.STRING,
    passHash: DataTypes.STRING,
    scope: DataTypes.STRING
  },
  {
   classMethods: {
     associate: function(models) {
       models.Account.belongsTo(models.User);
       models.Account.belongsTo(models.Provider);
     }
   }
});

  return account;

};
