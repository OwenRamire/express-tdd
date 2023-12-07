const express = require('express');
const { check } = require('express-validator');
const usersControllers = require('./controller');
const { findUserByEmail } = require('./service');

const router = express.Router();

router.get('/', usersControllers.getUsers);
router.post(
  '/',
  check('username')
    .notEmpty()
    .withMessage('username_null')
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage('username_size'),
  check('email')
    .notEmpty()
    .withMessage('email_null')
    .bail()
    .isEmail()
    .withMessage('email_invalid')
    .bail()
    .custom(async (email) => {
      const user = await findUserByEmail(email)
      if(user) {
        throw new Error('email_inuse');
      }
    }),
  check('password')
    .notEmpty()
    .withMessage('password_null')
    .bail()
    .isLength({ min: 6 })
    .withMessage('password_size')
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage('password_pattern'),
  usersControllers.createUsers
);

module.exports = router;
