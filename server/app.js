const app = require('express')
const server = require('http').createServer()
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000
const { selectWords } = require ('./helpers/axios')

let roundNumber = 0
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

  socket.on('startRound', (payload) => {
    roundNumber++
    selectWords(roundNumber + 2).then (data => {
      io.emit("showWord")
      io.emit("setRoundNumber", roundNumber)
      io.emit("setCurrentRoundWords", data)
    })
  })

  socket.on('resetRoundNumber', (payload) => {
    roundNumber = 0
  })
})

server.listen(PORT, () => {
  console.log('Running on', PORT);
})
