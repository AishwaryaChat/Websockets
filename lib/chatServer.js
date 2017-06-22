const socketio = require('socket.io')
const socketSession = require('express-socket.io-session')
let io = ''

exports.listen = (server, session) => {
  io = socketio.listen(server)
  io.use(socketSession(session))
  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('message', (message) => {
      console.log(message)
      io.emit('chatMessage', message)
    })
  })
}
