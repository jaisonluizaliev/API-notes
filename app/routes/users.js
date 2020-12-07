const express = require('express');
const router = express.Router();
const { userRegister, userAuth, emailUpdate, deleteUser, passwordUpdate} =  require('../controllers/routersUsers.js')
const withAuth = require('../middlewares/auth')


//register a new user
router.post('/register', userRegister)

//login
router.post('/login', userAuth)

//updateEmail
router.put('/', withAuth, emailUpdate)

//updatePassword
router.put('/password', withAuth, passwordUpdate)

//deleteUser
router.delete('/', withAuth, deleteUser)



module.exports = router;
