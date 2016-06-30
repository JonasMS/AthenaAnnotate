'use strict';
module.exports = function(sequelize, DataTypes) {
  var Follows = sequelize.define('Follows', {
    UserId: DataTypes.INTEGER,
    followsId: DataTypes.INTEGER,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.User.belongsToMany(models.User, {
          as: 'User',
          foreignKey: 'UserId',
          through: Follows
        });
        models.User.belongsToMany(models.User, {
          as: 'follows',
          foreignKey: 'followsId',
          through: Follows
        });
        Follows.belongsTo(models.User, {
          foreignKey: 'followsId',
          as: 'follows'
        });
        Follows.belongsTo(models.User, {
          foreignKey: 'UserId',
          as: 'User'
        });
      }
    }
  });
  return Follows;
};
