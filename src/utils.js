// returns random string based on given num parameter
const generateRandomString = function(num) {
  const charPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let result = '';
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    result += charPool[randomIndex];
  }

  return result;
};

// checks if a value exist in an object. returns boolean
const checkValinObj = function(obj, str) {
  if (Object.values(obj).includes(str)) {
    return true;
  }
  return false;
};

// returns all the URLs of the current user
const urlsForUser = function(objDatabase, userID) {
  const result = {};
  for (let shortURL in objDatabase) {
    const currentURL = objDatabase[shortURL];
    if (currentURL.userID === userID) {
      result[shortURL] = {
        longURL: currentURL.longURL,
        userID: userID
      };
    }
  }
  
  return result;
};

// returns user ID given their email and database obj
const getUserByEmail = function(email, database) {
  for (let user in database) {
    if (database[user].email === email) {
      return user;
    }
  }
  
  return false;
};

module.exports = {
  generateRandomString,
  checkValinObj,
  urlsForUser,
  getUserByEmail
} 