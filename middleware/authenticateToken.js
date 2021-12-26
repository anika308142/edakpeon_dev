const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
  token = req.header('Authorization');
  //console.log(token);
  //token = req.header['Auth'];
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    // console.log(req.user.usernumber);
    next()
  })
}

module.exports = authenticateToken;