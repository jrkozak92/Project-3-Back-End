const mongoose = require('mongoose')
const Schema = mongoose.Schema

const episodesSchema = new Schema({
  episodeNum: String,
  title: String,
  writers: String,
  airdate: String,
  description: String
})

const Episodes = mongoose.model('Episode', episodesSchema)

module.exports = Episodes