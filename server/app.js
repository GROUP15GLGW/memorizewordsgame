const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000
const { selectWords } = require ('./helpers/axios')

let roundNumber = 0
let players = []
let currentRoundWords = []
let saveWordsToClient = []
let correctAnsweredWords = {
  username: []
}

let resultAnswerPerRound = []
let clientDone = 0

io.on('connection', (socket) => {
  console.log('Socket.io client connected');
  socket.emit('initPlayers', players)

  socket.on('newPlayers', (payload) => {
    // cek username validate
    const samePlayers = players.filter(el => {
      return el.username = payload
    })
    const isSameUsername = samePlayers.length > 0
    let user = {
      username: isSameUsername ? `${payload}${samePlayers.length+1+''}` : payload,
      points: 0
    }
    players.push(user)
    io.emit('serverPlayers', user)
  })

  socket.on('startRound', (payload) => {
    roundNumber = 0
    roundNumber++
    console.log (roundNumber)
    io.emit("matchEnd", false)
    io.emit("allowType", false)
    selectWords(roundNumber + 2).then (data => {
      // currentRoundWords = data
      saveWordsToClient = data
      io.emit("showWord")
      io.emit("setRoundNumber", roundNumber)
      io.emit("setCurrentRoundWords", data)
    })
  })
  socket.on('hideWords', (payload) => {
    currentRoundWords = []
    io.emit("hideWords", [])
  })
  
  socket.on('answers', payload => {
    const { username, answer } = payload
    let isAnswerRight = false
    let sendAnswer = answer
    if (saveWordsToClient.includes(answer)) {

      !correctAnsweredWords[username] && (correctAnsweredWords[username] = [])
      correctAnsweredWords[username].push(answer)
      
      players.map(player => {
        player.username === username && player.points++
      })
      isAnswerRight = true

      sendAnswer = '*****'
      io.emit('updatePlayerPoint', players)
    }
    userResult = {
      username: username,
      answer: sendAnswer,
      result: isAnswerRight
    }
    resultAnswerPerRound.push(userResult)
    io.emit('resultAnswer', userResult)
  })

  socket.on('resetRoundNumber', (payload) => {
    roundNumber = 0
    io.emit("setRoundNumber", roundNumber)
  })

  socket.on('endRound', (payload) => {
    clientDone++
    // console.log (clientDone, 'client done')
    if (roundNumber <= 2 && clientDone == players.length) {
      console.log (roundNumber)
      clientDone = 0
      setTimeout(() => {
        roundNumber++
        selectWords(roundNumber + 2).then (data => {
          // currentRoundWords = data
          saveWordsToClient = data
          io.emit("allowType", false)
          io.emit("showWord")
          io.emit("setRoundNumber", roundNumber)
          io.emit("setCurrentRoundWords", data)
        })

        setTimeout(() => {
          currentRoundWords = []
          io.emit("hideWords", [])
        }, 10000)
        
      }, 5000)

    } else if (roundNumber > 2 && clientDone == players.length) {
      clientDone = 0
      io.emit("matchEnd", true)
      io.emit("allowType", false)
      console.log('max rounds reached - match ended')
      players.map(player => {
        player.points = 0
      })
    }
  })

  socket.on('clearPlayerData', (payload) => {
    players = players.filter(player => {
      if (player.username !== payload) {
        return player
      }
    })
    console.log (players)
  })
})

server.listen(PORT, () => {
  console.log('Running on', PORT);
})

