const { assert } = require('chai');

const { getUserByEmail } = require('../src/utils.js');

const users = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', () => {
  it('should return a user with valid email', () => {
    const user = getUserByEmail("user@example.com", users);
    const expectedOutput = "userRandomID";
    assert.equal(user, expectedOutput);
  });

  it('should return false when the email is not in the database', () => {
    const input = getUserByEmail("fake@gmail.com", users);
    const expectedOutput = false;
    assert.isNotTrue(input, expectedOutput);
  });
});