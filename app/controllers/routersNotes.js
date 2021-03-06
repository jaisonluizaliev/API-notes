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

async function searchNotes(req, res) {
  const {query} = req.query
  try {
    let notes = await Note
      .find({author: req.user._id})
      .find({$text: { $search: query }})
    res.json(notes)
  } catch (error) {
    res.json({error , message: 'Fail to search'}).status(500)
  }
}

async function downNote(req, res) {
  try {
    const { id } = req.params
    let note = await Note.findById(id)
    if(isOwner(req.user, note))
      res.status(200).json(note)
    else
      res.status(403).json({ error: "You don't have permission" })
  } catch (error) {
    res.status(500).json({error: 'problem to get a note' })
  }
}

async function showAllNotes(req, res) {
  try {
    let notes = await Note.find({author: req.user._id})
    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({ error: 'problem to show all notes' })
  }
}

async function updateNote(req, res) {
  const { title, body } = req.body
  const { id } = req.params
  
  try {
    let note = await Note.findById(id)
    if(isOwner(req.user, note)) {
      let note = await Note.findOneAndUpdate(
        id,
        {$set: {title, body}},
        {upsert: true, 'new': true}
      )

      res.status(200).json(note)
    } else {
      res.status(403).json({error: 'permition denied'})
    }
  } catch (error) {
    res.status(500).json({error: 'Problem to update this note!'})
  }
}

async function deleteNote(req, res) {
  const {id}= req.params 
  try {
    let note = await Note.findById(id)
    if(isOwner(req.user, note)) {
      await note.delete()
      res.json({ message: 'Sucessful to delete' }).status(204) 
    } else {
      res.status(403).json({error: 'Permission Denied: user no permited'})
    }
  } catch (error) {
    res.status(403).json({ error, message:'Fail to Delete... check in this error' })
  }
} 

//method to compare if user is note author
function isOwner(user, note) {
  if(JSON.stringify(user._id) == JSON.stringify(note.author._id))
    return true
  else 
    return false
}


module.exports = { createdNote, downNote, showAllNotes, updateNote, deleteNote, searchNotes } 