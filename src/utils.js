// recieves a num parameter, generates string with length num
const generateRandomString = function(num) {
  const charPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let result = '';
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    result += charPool[randomIndex];
  }

  return result;
};

console.log(generateRandomString(6));

module.exports = generateRandomString;