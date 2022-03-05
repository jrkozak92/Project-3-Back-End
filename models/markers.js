const mongoose = require('mongoose')

const markerSchema = new mongoose.Schema({
  coords: {lat: {type: Number, required: true}, lng: {type: Number, required: true}}
})

const Marker = mongoose.model('Marker', markerSchema)
module.exports = Marker;
