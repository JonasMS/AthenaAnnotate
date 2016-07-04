'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    facebookId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    picture: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Annotation);
        User.belongsToMany(User, {
          as: 'follows',
          through: models.Follows,
          foreignKey: 'UserId'
        });
        User.belongsToMany(User, {
          as: 'followers',
          through: models.Follows,
          foreignKey: 'followsId'
        });
        User.belongsToMany(models.Group, {
          as: 'groups',
          through: models.UserGroup,
          foreignKey: 'UserId'
        });
        User.belongsToMany(models.Group, {
          as: 'users',
          through: models.UserInvite,
          foreignKey: 'UserId'
        });
      }
    }
  });
  return User;
};
