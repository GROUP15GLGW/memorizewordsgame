const express = require('express')
const server = require('http').createServer(express)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3001

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
