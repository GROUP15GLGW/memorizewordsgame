const axios = require ('axios')

async function getWords (amount) {
  try {
    const response = await axios.get(`https://random-word-api.herokuapp.com/word?number=${amount}`);
    
    return response.data
  } catch (err) {
    console.error (err, 'error api getWords')
  }
} 

async function selectWords (amount) {
  try {
    let wordList = await getWords(50)

    let data = wordList.splice (0, amount)
    
    return data
  } catch (err) {
    console.error (err, 'error api selectWords')
  }

}

module.exports = {
  selectWords
}