const User = require('../models/user.js');

const updateUser = (req, res) => {
  const { user, firstName, lastName, phoneNumber } = req.body;
  User.update(
    { _id: user, firstName, lastName, phoneNumber }
  )
    .then(user => {
      res.send(user);
    }).catch(err => {
      res.status(412).send({
        message: err.message
      });
    });
};

const createUser = (req, res) => {
  User.create(
    req.body
  )
    .then(user => {
      res.send(user);
    }).catch(err => {
      res.status(412).send({
        message: err.message
      });
    });
};

const findFirstUser = (req, res) => {
  User.findOne()
    .then(user => {
      const { _id, firstName, lastName, phoneNumber } = user;
      res.send({
        userId: _id,
        firstName,
        lastName,
        phoneNumber
      });
    }).catch(err => {
      res.status(412).send({
        message: err.message
      });
    });
};

module.exports = {
  findFirstUser,
  createUser,
  updateUser
};
