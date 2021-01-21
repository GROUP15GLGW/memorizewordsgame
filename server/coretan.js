//client enter username
clientUsername = ''
//data awal di server
let players = [] 

//ketika client connect server push data yang diterima dari client
data1 = {
  username: 'player1',
  points: 0,
 }

data2 = {
  username: 'player2',
  points: 0
 }

//server mengecek jumlah player yang dibutuhkan min 2 

//emit.broadcast round start

//kiriman kata dari server
let round1Words= []
let round2Words= []
let round3Words= []
let round4Words= []
let round5Words= []


//kiriman data dari server
let players = [
  {
    username: 'player1',
    points: 0,
  },
  {
    username: 'player2',
    points: 0,
  }
]

//client menyimpan kata dan data dari server dalam state
state {
  users: [
    {
      username: 'player1',
      points: 1,
    },
    {
      username: 'player2',
      points: 3,
    }
  ],
  wordsAnswer: ''
}

//client menampilkan kata dan menjalankan timer 5 detik

//client mengisi kata (v-model) dengan timer 10 detik

//client mengembalikan kata dan username masing2
let data = {
    username: 'player1',
    words: //wordsAnswer,
  }

let players = [
  {
    username: 'player1',
    points: 0,
  },
  {
    username: 'player2',
    points: 0,
  }
]


//server mengecek jawaban client dan menambahkan point

//server mengembalikan data yang sudah di update
let players = [
  {
    username: 'player1',
    points: 1,
  },
  {
    username: 'player2',
    points: 3,
  }
]