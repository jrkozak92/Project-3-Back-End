const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Marker = require('../models/markers')
const axios = require('axios')

router.get('/', (req, res) => {
  Marker.find({}, (err, foundMarkers) => {
    res.json(foundMarkers)
  })
})

router.post('/', (req, res) => {
  Marker.create(req.body, (err, createdMarker) => {
    if (err) {
      console.log(err);
    } else {
      res.json(createdMarker)
    }
  })
})

router.delete('/:id', (req, res) => {
  Marker.findByIdAndDelete(req.params.id, (err, deletedMarker) => {
    res.json(deletedMarker)
  })
})

router.put('/:id', (req, res) => {
  Marker.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMarker) => {
    res.json(updatedMarker)
  })
})

module.exports = router
