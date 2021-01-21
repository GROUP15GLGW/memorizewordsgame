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




