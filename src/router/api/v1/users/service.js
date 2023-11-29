const bcrypt = require('bcrypt');
const User = require('../../../../user/User');

const saveUser = async (reqBody) => {
  const hash = await bcrypt.hash(reqBody.password, 10);
  const user = {
    ...reqBody,
    password: hash,
  };
  await User.create(user);
};

module.exports = {
  saveUser
}
