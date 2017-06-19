// creates a http server
const http = require('http')

const server = http.createServer((req, res) => {
})

server.listen(3000, () => {
  console.log('Server is listening on port 3000')
})

// creates a websocket server
const WS = require('websocket').server

const wsServer = new WS({
  httpServer: server
})

let count = 0
let clients = {}

// Listening for connections
wsServer.on('request', (req) => {
  // Accept the connection
  const connection = req.accept('echo-protocol', req.origin)
  let id = count++
  clients[id] = connection
  console.log(`Connection accepted ${id}`)
  connection.on('message', (message) => {
    // string message sent to server
    console.log(message)
    const msgString = message.utf8Data

    // loop through all the clients
    for (var i in clients) {
      // Send a message to the client with the message
      clients[i].sendUTF(msgString)
    }
  })
  // Listen for client disconnecting
  connection.on('close', (reasonCode, descritption) => {
    delete clients[id]
    console.log(`Peer ${connection.remoteAddress} disconnected`)
  })
})

// server.get('/', (req, res) => {
//   res.senFile('inde')
// })
