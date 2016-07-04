'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserInvite = sequelize.define('UserInvite', {
    sentFrom: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        UserInvite.belongsTo(models.User, {
          foreignKey: 'UserId',
          as: 'users'
        });
        UserInvite.belongsTo(models.Group, {
          foreignKey: 'GroupId',
          as: 'invites'
        });
      }
    }
  });
  return UserInvite;
};
