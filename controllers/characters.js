const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Character = require('../models/characters')
const axios = require('axios')

//REMOVE ALL DATA
// Character.collection.drop()

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

router.put('/:id', (req, res) => {
  Character.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCharacter) => {
    res.json(updatedCharacter)
  })
})


router.get('/seed', (req, res) => {
  axios.get('https://api.sampleapis.com/futurama/characters')
    .then((response) => {
      const rawSeedData = response.data
      const usableData = []
      rawSeedData.map((character) => {
        let characterName = `${character.name.first} ${character.name.middle} ${character.name.last}`
        characterName = characterName.trim()
        usableData.push({
          name: characterName,
          image: character.images.main,
          quote: character.sayings[Math.floor(Math.random()*character.sayings.length)]
        })
      })
      usableData.map((character) => {
        Character.create(character, (err, createdCharacter) => {})
      })
    res.json(usableData)
  })
})


module.exports = router
