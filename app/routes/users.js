const express = require('express');
const router = express.Router();
const {userRegister, userAuth} =  require('../controllers/routersUsers.js')


//register a new user
router.post('/register', userRegister)

//login
router.post('/login', userAuth)


module.exports = router;
