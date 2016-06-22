'use strict';
module.exports = function(sequelize, DataTypes) {
  var Annotation = sequelize.define('Annotation', {
    url: DataTypes.TEXT,
    text: DataTypes.TEXT,
    source: DataTypes.TEXT,
    exact: DataTypes.TEXT,
    prefix: DataTypes.TEXT,
    suffix: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    DocId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Annotation.belongsTo(models.User);
        Annotation.belongsTo(models.Doc);
        // associations can be defined here
      }
    }
  });
  return Annotation;
};
