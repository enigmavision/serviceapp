module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define("Service", {
    // Giving the Author model a name of type STRING
    lightcleaning: DataTypes.STRING;
    floors: DataTypes.STRING;
    bedrooms: DataTypes.STRING;
    windowcleaning: Datatype.STRING;
    twobedroomapartment: Datatype.STRING;
    onebedroomapartment: Datatype.STRING;
    kitchen: Datatype.STRING;
    bathroom: Datatype.STRING;

  },
  // Here we'll pass a second "classMethods" object into the define method
  // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          Author.hasMany(models.Post);
        }
      }
    });
  return User;
};
