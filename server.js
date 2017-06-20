const express = require('express')
const server = express()
const http = require('http').Server(server)
const path = require('path')
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {obj} = require('./config.js')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(express.static(path.join(__dirname, '/public/css')))
server.use('/images', express.static(path.join(__dirname, '/public/images')))
server.use(express.static(path.join(__dirname, '/public/html')))

// Database connection
mongoose.connect(`mongodb://${obj.hostName}:${obj.portNumber}/${obj.dbName}`)
const db = mongoose.connection
db.on('error', (err) => console.log('Error occured', err))
db.once('open', (err) => {
  if (err) {
    throw new Error('DB not connected')
  }
  http.listen(process.env.PORT || 3000)
  console.log('DB connected successfully at: ', Date())
})

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('message', (message) => {
    console.log(message)
    io.emit('chatMessage', message)
  })
})
