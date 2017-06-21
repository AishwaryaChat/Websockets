const socketio = require('socket.io')
let io = ''

exports.listen = (server) => {
  io = socketio.listen(server)
  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('message', (message) => {
      console.log(message)
      io.emit('chatMessage', message)
    })
  })
}
