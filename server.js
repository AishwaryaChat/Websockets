const express = require('express')
const server = express()
const http = require('http').Server(server)
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const uuid = require('node-uuid')

const env = require('./config')
const controllers = require('./src/controllers')
const chatServer = require('./lib/chatServer')
const session = require('express-session')({
  uniqID: uuid.v4(),
  secret: env.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 1.728e+8}
})

server.use(bodyParser.json(''))
server.use(bodyParser.urlencoded({extended: true}))
server.use(express.static(path.join(__dirname, '/public')))
server.use(session)
server.use(express.router)

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

// Database connection
mongoose.connect(`mongodb://${env.HOST_NAME}:${env.PORT_NUMBER}/${env.DB_NAME}`)
const db = mongoose.connection
db.on('something', (err) => console.log('Error occured', err))
db.once('open', (err) => {
  if (err) {
    throw new Error('DB not connected')
  }
  http.listen(process.env.PORT || 3000)
  console.log('DB connected successfully at:', Date())
})

server.get('/', (req, res) => {
  if (req.session.user_id !== undefined) return res.redirect('/home')
  res.render('')
})

server.get('/signup', (req, res) => {
  res.render('signup')
})

server.post('/adduser', controllers.users.addUser)

server.post('/checkuser', controllers.users.checkUser)

server.get('/home', (req, res) => {
  res.render('home')
})

chatServer.listen(http, session)
