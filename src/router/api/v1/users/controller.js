const userService = require('./service');

const getUsers = (req, res) => {
  res.status(200).json({ message: 'Successful' });
}

const createUsers = async (req, res) => {
  const user = req.body;

  if(user.username === null || user.username.trim() === '') {
    return res.status(400).send({
      validationErrors: {
        username: 'username cannot be null',
      }
    });
  }
  await userService.saveUser(req.body);
  return res.status(200).send({ message: 'User created' });
};

module.exports = {
  createUsers,
  getUsers
}