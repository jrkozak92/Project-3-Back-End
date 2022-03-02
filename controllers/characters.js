const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Character = require('../models/characters')

router.get('/', (req, res) => {
  Character.find({}, (err, foundCharacters) => {
    res.json(foundCharacters)
  })
})

router.post('/', (req, res) => {
  Character.create(req.body, (err, createdCharacter) => {
    res.json(createdCharacter)
  })
})

router.delete('/:id', (req, res) => {
  Character.findByIdAndDelete(req.params.id, (err, deletedCharacter) => {
    res.json(deletedCharacter)
  })
})

module.exports = router