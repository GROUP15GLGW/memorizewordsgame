
  // var counter = 5;
  // var WinnerCountdown = setInterval(function(){
  //   socket.emit('counter', counter);
  //   if (players.length > 2) {
  //     counter--
  //     if (counter === 0) {
  //       isGameStart = true
  //       io.sockets.emit('counter', "Remember those");
  //       roundNumber++
  //       selectWords(roundNumber + 2).then (data => {
  //         // currentRoundWords = data
  //         saveWordsToClient = data
  //         io.emit("showWord")
  //         io.emit("setRoundNumber", roundNumber)
  //         io.emit("setCurrentRoundWords", data)
  //       })
  //       clearInterval(WinnerCountdown);
  //     }
  //   }
  // }, 1000);

  // var showTime = 5;
  // var showTimess = setInterval(function(){
  //   socket.emit('counter', showTime);
  //   if (isGameStart) {
  //     showTime--
  //     if (showTime === 0) {
  //       console.log('OKK');
  //       // io.sockets.emit('counter', "Congratulations You WON!!");
  //       currentRoundWords = []
  //       io.emit("hideWords", [])
  //       clearInterval(showTimess);
  //     }
  //   }
  // }, 1000);