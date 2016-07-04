var models = require('../models/index');
var Promise = require('bluebird');

var addOtherUsers = function(array, groupId, creator) {
  console.log(array, groupId, creator);
  models.User.findAll({
    where: {
      name: {
        $in: array
      }
    }
  }).then(function(users) {
    var userIds = users.map(function(user) {
      return (
        models.UserInvite.create({
          UserId: user.dataValues.id,
          GroupId: groupId,
          sentFrom: creator
        })
      );
    });

    Promise.all(userIds)
    .then(function(results) {
      console.log(results);
    });
  });
};

module.exports = addOtherUsers;
