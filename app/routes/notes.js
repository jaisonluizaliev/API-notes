const express = require('express')
const router = express.Router()
const withAuth = require('../middlewares/auth.js')
const { createdNote } = require('../controllers/routersNotes.js')
//firstnote
router.post('/', withAuth , createdNote)


module.exports = router