const { validationResult } = require('express-validator');
const userService = require('./service');

const getUsers = (req, res) => {
  res.status(200).json({ message: 'Successful' });
}

const createUsers = async (req, res) => {
  const errorResults = validationResult(req);
  if(!errorResults.isEmpty()) {
    const validationErrors = {};
    errorResults.array().forEach((error) => (validationErrors[error.path] = error.msg));
    return res.status(400).send({ validationErrors: validationErrors });
  }
  try {
    await userService.saveUser(req.body);
    return res.status(200).send({ message: 'User created' });
  } catch(err) {
    return res.status(400).send({ validationErrors: { email: 'E-mail in use' } });
  }
};

module.exports = {
  createUsers,
  getUsers
}