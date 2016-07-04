// to reformat the data from the database into User object
module.exports = function(user, res) {
  var result = {};

  result.id = user.id;
  result.facebook = {
    id: user.facebookId,
    name: user.name,
    email: user.email,
    picture: user.picture
  };
  res.send(result);
};
