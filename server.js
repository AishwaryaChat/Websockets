const server = require('express')()
const http = require('http').Server(server)
const path = require('path')

http.listen(3000, () => {
  console.log('listening on port 3000')
})

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})
