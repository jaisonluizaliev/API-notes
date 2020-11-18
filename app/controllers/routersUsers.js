const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_TOKEN

async function userRegister (req, res) {
  const{ name, email, password } = req.body
  const user = new User({ name, email, password })
  try {
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error: 'Error to register!'})
  }
}

async function userAuth (req, res) {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if(!user)
      res.status(401).json({error: 'user or password incorrect'})
    else {
      user.isCorrectPassword(password, function(err, same){
        if(!same)
          res.status(401).json({ error: 'user or password incorrect' })
        else {
          let token = jwt.sign({email}, secret, { expiresIn: '1000d'})
          res.json({user, token})
        }
      })
    }
  } catch (error) {
    res.status(500).json({error: 'this application is broking'})
  }
}

module.exports = {userRegister, userAuth}