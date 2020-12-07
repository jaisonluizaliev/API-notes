const express = require('express')
const router = express.Router()
const withAuth = require('../middlewares/auth.js')
const { createdNote, downNote, showAllNotes, updateNote, deleteNote, searchNotes } = require('../controllers/routersNotes.js')
//firstnote
router.post('/', withAuth , createdNote)

//search the notes
router.get('/search', withAuth, searchNotes)

//download note
router.get('/:id', withAuth, downNote)

//show all notes
router.get('/', withAuth, showAllNotes)

//update the notes
router.put('/:id', withAuth, updateNote)

//del route
router.delete('/:id', withAuth, deleteNote)

module.exports = router