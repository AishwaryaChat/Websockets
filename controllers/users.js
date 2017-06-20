const Users = require('../models/users.js')

// Validating if user exist and Adding a user
exports.addUser = (req, res) => {
  Users.findOne({'emailID': req.body.emailAddress}, (err, doc) => {
    if (doc) {
      return res.send({message: 'already'})
    } else if (!doc) {
      createUser(req, res)
    }
    if (err) {
      return res.send({err})
    }
  })
}

function createUser (req, res) {
  Users.create({
    name: req.body.firstname + ' ' + req.body.lastname,
    emailID: req.body.emailAddress,
    password: req.body.password
  }, (err, response) => {
    if (err) {
      console.log(err)
      return res.send({err})
    } else {
      return res.send({message: 'OK'})
    }
  })
}
