const jwt = require('jsonwebtoken');

function authenticateRole(req, res, next) {
    token = req.header('User-Role');
    //console.log(token);
    //token = req.header['Auth'];
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, model) => {
        if (err) return res.sendStatus(403)
        req.model = model
        // console.log(req.user.role);
        next()
    })
}
module.exports = authenticateRole;