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

module.exports = {
  generateRandomString,
  checkValinObj
} 