const userService = require('./service');

const getUsers = (req, res) => {
  console.log('heloo');
  res.status(200).json({ message: 'Successful' });
}

const createUsers = async (req, res) => {
  // console.log(req.body);
  await userService.saveUser(req.body);
  return res.status(200).send({ message: 'User created' });
};

module.exports = {
  createUsers,
  getUsers
}