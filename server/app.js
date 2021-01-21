const express = require('express')
const server = require('http').createServer(express)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3001
const { selectWords } = require ('./helpers/axios')

selectWords(3).then (data => {
  console.log (data, 'round1Words')
  return data
})

selectWords(4).then (data => {
  console.log (data, 'round2Words')
  return data
})

selectWords(5).then (data => {
  console.log (data, 'round3Words')
  return data
})

selectWords(6).then (data => {
  console.log (data, 'round3Words')
  return data
})

selectWords(7).then (data => {
  console.log (data, 'round4Words')
  return data
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
