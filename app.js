// creates a http server
const http = require('http')

const server = http.createServer((req, res) => {
  res.end('hi')
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
    const msgString = message.utf8data

    // loop through all the clients
    for (var i in clients) {
      clients[i].sendUTF(msgString)
    }
  })
})
