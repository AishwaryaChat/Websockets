const socketio = require('socket.io')
const sharedSession = require('express-socket.io-session')

let io = ''
const userDetails = []
let userCount = 0

exports.listen = (server, session) => {
  io = socketio.listen(server)
  io.use(sharedSession(session))
  io.on('connection', connectionEvent)
}

const connectionEvent = socket => {
  createUserName(socket)
  relayMessage(socket)
  disconnetUser(socket)
}

const relayMessage = socket => {
  socket.on('message', (message) => {
    io.emit('chatMessage', {
      user: getUserName(socket),
      text: message
    })
  })
}

const disconnetUser = socket => {
  socket.on('disconnect', () => {
    socket.broadcast.emit('chatMessage', {
      user: getUserName(socket),
      text: 'disconnected'
    })
  })
}

const createUserName = socket => userDetails.push({id: socket.id, userName: `user ${++userCount}`})

const getUserName = socket => userDetails[getUserID(socket.id)].userName

const getUserID = id => userDetails.map(user => user.id === id).indexOf(true)

const dropUser = socket => userDetails.splice(getUserID(socket.id), 1)
