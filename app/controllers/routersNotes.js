const Note = require('../models/note')

async function createdNote(req, res) {
  const {title, body} = req.body
  try {
    let note = new Note({ title, body, author: req.user._id }) 
    await note.save()
    res.status(200).json(note) 
  } catch (error) {
    res.status(500).json({error: 'problem to create a note'}) 
  }
}


module.exports = { createdNote } 