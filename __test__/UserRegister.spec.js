const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelize = require('../src/config/database');

const validUser = {
  username: 'user1',
  email: 'user1@mail.com',
  password: 'P4ssword',
};

const postUser = (user = validUser) => {
  return request(app)
    .post('/api/1.0/users')
    .send(user)
};

describe('User registration', () => {
  beforeAll(() => {
    return sequelize.sync();
  });

  beforeEach(() => {
    return User.destroy({ truncate: true });
  });

  test('returns 200 OK when signup request is valid', async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
  });
  
  test('returns success message when signup request is valid', async () => {
   const response = await postUser();
   expect(response.body.message).toBe('User created');
  });

  test('saves the user to database', async () => {
    await postUser()
    // query user table
    const userList = await User.findAll()
    expect(userList.length).toBe(1);
   
  });

  test('saves the username and email to database', async () => {
    await postUser()
    // query user table
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(userList.length).toBe(1);
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@mail.com');
  });

  test('hashes the password in database', async () => {
    await postUser()
    // query user table
    const userList = await User.findAll()
    const savedUser = userList[0];
    expect(savedUser.password).not.toBe('P4ssword');
  });
});

describe.only('Invalid user registration', () => {
  test('return 400 when user is null', async () => {
    const response = await postUser({
      username: null,
      email: 'user1@mail.com',
      password: 'P4ssword',
    })
    expect(response.status).toBe(400);
  });

  test('returns validationErrors field in response body when validation error occurs', async () => {
    const response = await postUser({
      username: null,
      email: 'user1@mail.com',
      password: 'P4ssword',
    });
    const body = response.body;
    expect(body.validationErrors).not.toBeUndefined();
  });

  test('returns Username cannot be null when user is null', async () => {
    const response = await postUser({
      username: null,
      email: 'user1@mail.com',
      password: 'P4ssword',
    });
    const body = response.body;
    expect(body.validationErrors).not.toBeNull();
  });
});
