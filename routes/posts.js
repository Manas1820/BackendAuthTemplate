const router = require('express').Router();
const verify = require('../middleware/verifyToken');

router.get('/', verify, (req, res) => {
    const posts = {
        title: "Hello World",
        description: "Secure Data"
    };
    res.json({
        posts: posts
    });
});

module.exports = router;