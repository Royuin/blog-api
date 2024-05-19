const bcrypt = require('bcrypt');

async function genPassword(password:string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

async function validatePassword(password:string, passwordHash:string) {
  return await bcrypt.compare(password, passwordHash);
};

module.exports.genPassword = genPassword;
module.exports.validatePassword = validatePassword;
