const server = require('express')()
const http = require('http').Server(server)

http.listen(3000, () => {
  console.log('listening on port 3000')
})

server.get('/', (req, res) => {
  res.send('Hello World')
})
