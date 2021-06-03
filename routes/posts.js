const router = require('express').Router();
const { authVerify } = require('./verifyToken');


//route with middleware authVerify
router.get('/', authVerify, (req, res) => {
    res.json({ posts: { title: 'my fits jwt', description: 'you shouldnt access this' } })
})

module.exports = router;