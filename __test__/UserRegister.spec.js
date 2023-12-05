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
  beforeAll(() => {
    return sequelize.sync();
  });

  beforeEach(() => {
    return User.destroy({ truncate: true });
  });

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

  const username_null = 'Username cannot be null';
  const username_size = 'Must have min 4 and max 32 characters';
  const email_null = 'E-mail cannot be null';
  const email_invalid = 'E-mail is not valid';
  const password_null = 'Password cannot be null';
  const password_size = 'Password must be at least 6 characters';
  const password_pattern = 'Password must have at least 1 uppercase, 1 lowercase letter and 1 number';
  const email_inuse = 'E-mail in use';

  // Dynamic test
  test.each`
    field         | value               | expectedMsg
    ${'username'} | ${null}             | ${username_null}
    ${'username'} | ${'usr'}            | ${username_size}
    ${'username'} | ${'a'.repeat(33)}   | ${username_size}
    ${'email'}    | ${null}             | ${email_null}
    ${'email'}    | ${'mail.com'}       | ${email_invalid}
    ${'email'}    | ${'user.mail.com'}  | ${email_invalid}
    ${'email'}    | ${'user@mail'}      | ${email_invalid}
    ${'password'} | ${null}             | ${password_null}
    ${'password'} | ${'P4ssw'}          | ${password_size}
    ${'password'} | ${'alllowercase'}   | ${password_pattern}
    ${'password'} | ${'ALLUPPERCASE'}   | ${password_pattern}
    ${'password'} | ${'012345678921'}   | ${password_pattern}
    ${'password'} | ${'lowerand133a'}   | ${password_pattern}
    ${'password'} | ${'UPPERAND133A'}   | ${password_pattern}
  `('returns $expectedMsg when $field is null', async ({ field, expectedMsg, value }) => {
    const user = {
      username: 'user1',
      email: 'user@mail.com',
      password: 'P4ssword',
    };
    user[field] = value;
    const response = await postUser(user);
    const body = response.body;
    expect(body.validationErrors[field]).toBe(expectedMsg);
  });

  test('returns errors when username and email are null', async () => {
    const response = await postUser({
      username: '',
      email: '',
      password: 'P4ssword',
    });
    const body = response.body;
    expect(Object.keys(body.validationErrors)).toEqual(['username', 'email']);
  });

  test(`returns "${email_inuse}" when same email is already in use`, async () => {
    await User.create({...validUser});
    const response = await postUser();
    console.log(response.body.validationErrors);
    expect(response.body.validationErrors.email).toBe(email_inuse);
  });

  test('returns errors for both username is null and email is in use', async () => {
    await User.create(validUser);
    const response = await postUser({
      username: null,
      email: validUser.email,
      password: 'P4ssword'
    });
    const body = response.body;
    console.log(body.validationErrors);
    expect(Object.keys(body.validationErrors)).toEqual(['username', 'email']);
  });
});
