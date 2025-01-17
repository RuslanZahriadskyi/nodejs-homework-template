const users = [
  {
    _id: "60abf0ea4c83ea103cd0ed7a",
    name: "user1",
    subscription: "none",
    token: null,
    email: "user1@mail.com",
    password: "1234567890",
  },

  {
    _id: "60abf153ff100f54e40f3bd8",
    name: "user2",
    subscription: "none",
    token: null,
    email: "user2@mail.com",
    password: "1234567890",
  },
  {
    _id: "60abf153ff100f54e40f3bd9",
    name: "user3",
    subscription: "none",
    token: null,
    email: "newUser@mail.com",
    password: "1234567890",
  },
  {
    _id: "1",
    name: "user4",
    subscription: "none",
    token: null,
    email: "user4@mail.com",
    password: "1234567890",
  },
];

const newUser = {
  name: "newUser",
  subscription: "none",
  token: null,
  email: "newUser1@mail.com",
  password: "1234567890",
};

const newUserError = {
  name: "newUser",
  subscription: "none",
  token: null,
  email: "newUser@mail.com",
  password: "1234567890",
};

const user = {
  _id: "1",
  name: "user",
  subscription: "none",
  token: null,
  email: "user@gmail.com",
  password: "1234567890",
};

users[0] = user;

module.exports = { users, newUser, newUserError, user };
