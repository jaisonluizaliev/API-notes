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

async function emailUpdate(req, res) {
  const { name, email } = req.body

  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { name: name, email: email } },
      { upsert: true, 'new': true }
    )
    res.json(user)
  } catch (error) {
    res.status(401).json({ error: error })
  }
}

async function passwordUpdate(req, res) {
  const { password } = req.body

  try {
    let user = await User.findOne({ _id: req.user._id })
    user.password = password
    user.save()
    res.json(user)
  } catch (error) {
    res.status(401).json({ error: error })
  }
};

async function deleteUser(req, res) {
  try {
    let user = await User.findOne({ _id: req.user._id })
    await user.delete()
    res.json({ message: 'OK' }).status(201)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}


module.exports = {userRegister, userAuth, emailUpdate, passwordUpdate, deleteUser}