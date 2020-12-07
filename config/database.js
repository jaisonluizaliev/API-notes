const mongoose = require('mongoose')

mongoose.Promise = global.Promise 

require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL, {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex: true
}).then(()=> console.log('DB OK'))
.catch(()=> console.log(error))