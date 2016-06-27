var Router = require('express').Router;
var router = new Router();
var models = require('../models/index');
var annotationConstructor = require('../utils/annotationConstructor');
var listOfDocs = require('../utils/listOfDocs');
var userConstructor = require('../utils/userConstructor');

// EXTENSION - creates an annotation for a given Doc and User
router.post('/api/create', function(req, res) {
  models.Doc.findOrCreate({
    where: { url: req.body.target.source },
    raw: true
  }).then(function(doc) {
    models.Annotation.create({
      UserId: Number(req.body.creator),
      DocId: Number(doc[0].id),
      url: req.body.id,
      text: req.body.body.text,
      source: req.body.target.source,
      exact: req.body.target.selector.exact,
      prefix: req.body.target.selector.prefix,
      suffix: req.body.target.selector.suffix,
      private: req.body.private,
      groupId: req.body.groupId
    }).then(function(note) {
      models.Annotation.findAll({
        include: [{
          model: models.User
        }],
        where: { id: note.dataValues.id }
      }).then(function(annotation) {
        annotationConstructor(annotation, res);
      }).catch(function(err) {
        res.send(err);
      });
    }).catch(function(err) {
      res.send(err);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// EXTENSION - loads Annotations for a given Doc for a given User
router.get('/api/doc', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      UserId: req.query.UserId,
      source: req.query.source
    },
    order: [['createdAt', 'ASC']]
  }).then(function(annotations) {
    annotationConstructor(annotations, res);
  }).catch(function(err) {
    res.send(err);
  });
});

// BOTH - updates an annotation
router.put('/api/annotations', function(req, res) {
  models.Annotation.update({
    // exact: req.body.target.selector.exact,
    // prefix: req.body.target.selector.prefix,
    // suffix: req.body.target.selector.suffix,
    text: req.body.body.text
  }, {
    where: { url: req.body.id },
    returning: true
  }).then(function(annotations) {
    models.Annotation.findAll({
      include: [{
        model: models.User
      }],
      where: { url: annotations[1][0].dataValues.url }
    }).then(function(annotation) {
      annotationConstructor(annotation, res);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// BOTH - deletes an annotation
router.delete('/api/annotations', function(req, res) {
  models.Annotation.destroy({
    where: { url: req.query.id }
  }).then(function() {
    res.send('deleted');
  }).catch(function() {
    res.send('error');
  });
});

// BOTH - finds or creates User
router.post('/api/users', function(req, res) {
  models.User.findOrCreate({
    where: {
      facebookId: req.body.id
    },
    defaults: {
      name: req.body.name,
      email: req.body.email
    }
  }).then(function(user) {
    userConstructor(user[0], res);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - updates a User's info
router.put('/api/users', function(req, res) {
  models.User.update({
    name: req.body.name,
    title: req.body.title
  }, {
    where: { id: req.body.id },
    returning: true
  }).then(function(users) {
    res.send(users[1]);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - loads all Annotations for a given User
router.get('/api/annotations', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      UserId: req.query.UserId
    },
    order: [['updatedAt', 'DESC']]
  }).then(function(annotations) {
    res.send(annotations);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - loads all public Annotations excluding the User's own
router.get('/api/discover', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      UserId: {
        $notIn: [req.query.UserId]
      },
      private: 'Public'
    },
    order: [['updatedAt', 'DESC']]
  }).then(function(annotations) {
    res.send(annotations);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - loads all Annotations form users that User is following
router.get('/api/following', function(req, res) {
  models.Follows.findAll({
    include: [{
      model: models.User,
      as: 'follows'
    }],
    where: {
      UserId: req.query.UserId
    }
  }).then(function(users) {
    // console.log(users);
    models.Annotation.findAll({
      include: [{
        model: models.User
      }, {
        model: models.Doc
      }],
      where: {
        UserId: {
          $in: users.map(function(user) {
            return user.dataValues.follows.id;
          })
        },
        private: 'Public'
      },
      order: [['updatedAt', 'DESC']]
    }).then(function(annotations) {
      res.send(annotations);
    }).catch(function(err) {
      res.send(err);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - loads Docs for a given User
router.get('/api/docs', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }],
    where: {
      UserId: req.query.UserId
    }
  }).then(function(annotations) {
    listOfDocs(annotations, res);
  }).catch(function(err) {
    res.send(err);
  });
});

module.exports = router;

// BOTH - toggles following a User
router.post('/api/follow', function(req, res) {
  models.Follows.findAll({
    where: {
      UserId: req.body.id,
      followsId: req.body.userId
    }, attributes: ['id']
  }).then(function(join) {
    if (join.length === 0) {
      models.Follows.create({
        UserId: req.body.id,
        followsId: req.body.userId
      }).then(function(newjoin) {
        res.send(newjoin);
      }).catch(function(err) {
        res.send(err);
      });
    } else {
      models.Follows.destroy({
        where: {
          id: join[0].id
        }
      }).then(function() {
        res.send(JSON.stringify({ UserId: 'deleted' }));
      }).catch(function() {
        res.send(JSON.stringify({ failure: 'failure' }));
      });
    }
  }).catch(function() {
  });
});

// BOTH - loads a list of userIds that a user is following
router.get('/api/follow', function(req, res) {
  models.Follows.findAll({
    include: [{
      model: models.User,
      as: 'follows'
    }],
    where: {
      UserId: req.query.UserId
    }
    // attributes: ['followsId']
  }).then(function(users) {
    // console.log(users);
    res.send(users.map(function(user) {
      return user.dataValues.follows.id;
    }));
    // res.send(users);
  }).catch(function(err) {
    // console.log(err);
    res.send(err);
  });
});

// BOTH - finds a Group, or creates a Group and adds User as a member
router.post('/api/groups', function(req, res) {
  // console.log(req.body);
  models.Group.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(function(group) {
    // console.log('This is the group found or created /\n', group);
    // if group was found --> send error message to User
    if (group[1] === false) {
      res.send(JSON.stringify('Group Already Exists!'));
    } else {
      models.UserGroup.create({
        UserId: req.body.UserId,
        GroupId: group[0].dataValues.id
    // if no group was found, get id
      }).then(function(newGroup) {
        // console.log('This is the association between user and group /\n', newGroup);
        res.send(JSON.stringify(newGroup.dataValues.GroupId));
      }).catch(function(err) {
        res.send(err);
      });
    }
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - gets list of Groups for a User
router.get('/api/groups', function(req, res) {
  models.UserGroup.findAll({
    include: [{
      model: models.Group,
      as: 'users'
    }],
    where: {
      UserId: req.query.UserId
    }
  }).then(function(groups) {
    // console.log(groups);
    res.send(groups.map(function(group) {
      return group.dataValues.users;
    }));
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - removes association to a Group - returns list of Groups
router.delete('/api/groups', function(req, res) {
  models.UserGroup.destroy({
    where: {
      UserId: req.query.UserId,
      GroupId: req.query.GroupId
    }
  }).then(function() {
    models.UserGroup.findAll({
      include: [{
        model: models.Group,
        as: 'users'
      }],
      where: {
        UserId: req.query.UserId
      }
    }).then(function(groups) {
      // console.log(groups);
      res.send(groups.map(function(group) {
        return group.dataValues.users;
      }));
    }).catch(function(err) {
      res.send(err);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - load all annotations for a specific group
router.get('/api/group', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      private: 'Group',
      groupId: req.query.GroupId
    },
    order: [['updatedAt', 'DESC']]
  }).then(function(annotations) {
    res.send(annotations);
  }).catch(function(err) {
    res.send(err);
  });
});
