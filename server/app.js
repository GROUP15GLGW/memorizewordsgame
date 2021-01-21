const app = require('express')()
const server = require('http').createServer(express)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000

const { selectWords } = require ('./helpers/axios')

let roundNumber = 1

io.on('connection', function(socket) {
  console.log('Socket.io client connected')
  
  selectWords(roundNumber + 2).then (data => {
    // console.log (data, 'round1Words')
    io.emit("setRoundNumber", roundNumber)
    io.emit("setCurrentRoundWords", data)
  })
 
})

server.listen(3000, () => {
  console.log('listening on port ' + 3000)
})

let players = []

io.on('connection', (socket) => {
  console.log('Socket.io client connected');
  socket.emit('initPlayers', players)

  socket.on('newPlayers', (payload) => {
    // cek username validate
    let user = {
      username: payload,
      points: 0
    }
    players.push(user)
    io.emit('serverPlayers', user)
  })
})

server.listen(PORT, () => {
  console.log('Running on', PORT);
})
