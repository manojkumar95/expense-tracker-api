const User = require('../models/user.js');

const updateUser = (req, res) => {
  const { user, firstName, lastName, phoneNumber } = req.body;
  User.update(
    { _id: user, firstName, lastName, phoneNumber }, { runValidators: true }
  )
    .then(user => {
      res.send(user);
    }).catch(err => {
      if (err.CastError) {
        res.status(412).send({
          message: "User Id does not exist"
        });
      } else {
        res.status(412).send({
          message: err.message
        });
      }
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
      res.status(404).send({
        message: err.message
      });
    });
};

module.exports = {
  findFirstUser,
  updateUser
};
