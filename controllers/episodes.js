const express = require('express')
const router = express.Router()
const Episodes = require('../models/episodes')
const mongoose = require('mongoose')
const axios = require('axios')

router.get('/', (req, res) => {
  Episodes.find({}, (err, foundEpisodes) => {
    res.json(foundEpisodes)
  })
})

router.get('/seed', (req, res) => {
  axios.get('https://api.sampleapis.com/futurama/episodes')
       .then((response) => {
         const rawSeedData = response.data
         const usableData = []
         rawSeedData.map((ep) => {
           usableData.push({
             episodeNum: ep.number,
             title: ep.title,
             writers: ep.writers,
             airdate: ep.originalAirDate,
             description: ep.desc
           })
         })
         usableData.map((ep) => {
           Episodes.create(ep, (err, createdEpisode) => {})
         })
       res.json(usableData)
       })
})

module.exports = router