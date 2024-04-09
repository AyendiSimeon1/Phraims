const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello from Users API' });
})

module.exports = router;

/api/users/signup
/api/users/login
/api/users/me
/api/users/update
/api/users/forgot-password
/api/users/reset-password
