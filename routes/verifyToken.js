const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verify = jwt.verify(token.process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (e) {
        return res.send(500).send('Bad Request');
    }

}