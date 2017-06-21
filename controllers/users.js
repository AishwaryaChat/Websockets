const bcrypt = require('bcrypt')

const Users = require('../models/users.js')

// Validating if user exist and Adding a user
exports.addUser = (req, res) => {
  Users.findOne({'emailID': req.body.emailAddress}, (err, doc) => {
    if (doc) {
      return res.send({message: 'already'})
    } else if (!doc) {
      hashPassword(req, res)
    }
    if (err) {
      return res.send({err})
    }
  })
}

// hashing password
const hashPassword = (req, res) => {
  const pass = req.body.password
  bcrypt.genSalt(12, (err, salt) => {
    if (err) throw new Error(`Not able to generate salt`)
    bcrypt.hash(pass, salt, (err, hash) => {
      if (err) throw new Error(`Not able to generate hash`)
      req.body.password = hash
      createUser(req, res, salt)
    })
  })
}

// creating a user entry in database
function createUser (req, res, salt) {
  console.log('password', req.body.password)
  Users.create({
    name: req.body.firstname + ' ' + req.body.lastname,
    emailID: req.body.emailAddress,
    password: req.body.password,
    salt: salt
  }, (err, response) => {
    if (err) {
      console.log(err)
      return res.send({err})
    } else {
      return res.send({message: 'OK'})
    }
  })
}
