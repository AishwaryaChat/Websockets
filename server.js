const express = require('express')
const server = express()
const http = require('http').Server(server)
const path = require('path')
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {obj} = require('./config.js')

const controllers = require('./controllers')

server.use(bodyParser.json(''))
server.use(bodyParser.urlencoded({extended: true}))
server.use(express.static(path.join(__dirname, '/public')))
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

// Database connection
mongoose.connect(`mongodb://${obj.hostName}:${obj.portNumber}/${obj.dbName}`)
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
  res.render('')
})

server.get('/signup', (req, res) => {
  res.render('signup')
})

server.post('/adduser', controllers.users.addUser)

server.post('/checkuser', controllers.users.checkUser)

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('message', (message) => {
    console.log(message)
    io.emit('chatMessage', message)
  })
})
