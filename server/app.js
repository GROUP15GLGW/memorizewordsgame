const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
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

// selectWords(3).then (data => {
//   console.log (data, 'round1Words')
// })

// selectWords(4).then (data => {
//   console.log (data, 'round2Words')
// })

// selectWords(5).then (data => {
//   console.log (data, 'round3Words')
// })

// selectWords(6).then (data => {
//   console.log (data, 'round3Words')
// })

// selectWords(7).then (data => {
//   console.log (data, 'round4Words')
// })




