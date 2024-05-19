const bcrypt = require('bcrypt');

function genPassword(password:string) {
  const hash = bcrypt.hash(password, 10);
  return hash;
};

module.exports.genPassword = genPassword;
