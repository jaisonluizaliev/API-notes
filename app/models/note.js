const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  author: { //relacionando ao outro schema que sera o usuario por id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

//manual index
noteSchema.index({'title': 'text', 'body': 'text'})

module.exports  = mongoose.model('Note', noteSchema)