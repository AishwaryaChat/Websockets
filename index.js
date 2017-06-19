const server = require('express')()
const http = require('http').Server(server)
const path = require('path')
const io = require('socket.io')(http)
const bodyParser = require('body-parser')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

http.listen(3000, () => {
  console.log('listening on port 3000')
})

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('message', (message) => {
    console.log(message)
    io.emit('chatMessage', message)
  })
})
