const express = require('express')
const router = express.Router()
const withAuth = require('../middlewares/auth.js')
const { createdNote, downNote, showAllNotes, updateNotes } = require('../controllers/routersNotes.js')
//firstnote
router.post('/', withAuth , createdNote)

//download note
router.get('/:id', withAuth, downNote)

//show all notes
router.get('/', withAuth, showAllNotes)

//update the notes
router.put('/:id', withAuth, updateNotes)

module.exports = router