const { check } = require('express-validator');

const validateUsername = (req, res, next) => {
  // const user = req.body;

  check('username').notEmpty().withMessage('E-mail cannot be null');
  // if(user.username === null || user.username.trim() === '') {
  //   req.validationErrors = {
  //     ...req.validationErrors,
  //     username: 'username cannot be null',
  //   };
  //   // return res.status(400).send({
  //   //   validationErrors: {
  //   //     username: 'username cannot be null',
  //   //   }
  //   // });
  // }
  next();
}

const validateUserEmail = (req, res, next) => {
  check('username').notEmpty().withMessage('E-mail cannot be null');
  // const user = req.body;

  // if(user.email === null || user.email.trim() === '') {
  //   req.validationErrors = {
  //     ...req.validationErrors,
  //     email: 'E-mail cannot be null',
  //   }
    // return res.status(400).send({
    //   validationErrors: {
    //     email: 'E-mail cannot be null',
    //   }
    // });
  // }
  next();
}

module.exports = {
  validateUsername,
  validateUserEmail,
};
