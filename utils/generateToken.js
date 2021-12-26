const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
var secret = process.env.TOKEN_SECRET;
module.exports = {
  generateAccessToken: async function (usernumber) {
    return jwt.sign(usernumber, secret, { expiresIn: '180000s' });
  },
  generateRole: async function (role) {
    return jwt.sign(role, secret, { expiresIn: '180000s' });
  }

};