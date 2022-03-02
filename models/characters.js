const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
  name: String,
  image: String,
  quote: String
})

const Characters = mongoose.model('Character', characterSchema)

module.exports = Characters