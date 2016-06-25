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
    }
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
      }
    }
  });
  return User;
};
