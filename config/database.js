const mongoose = require('mongoose')

mongoose.Promise = global.Promise 

mongoose.connect('mongodb://localhost/clone-evernote', {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex: true
}).then(()=> console.log('DB OK'))
.catch(()=> console.log(error))