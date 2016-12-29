module.exports = function(sequelize, DataTypes) {
  var serviceapp = sequelize.define("Serviceapp", {
    // Persist configuration and operational values for the app
    Secret: DataTypes.BLOB

  });

  return serviceapp;

};
