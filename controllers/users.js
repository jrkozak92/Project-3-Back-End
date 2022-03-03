const bcrypt = require('bcrypt')
const express = require('express')
const mongoose = require('mongoose')
const users = express.Router()
const User = require('../models/users.js')

//future account info
// users.get('/account/:id', (req, res) => {
//
// })

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser);
    res.json(createdUser);
  })
})

module.exports = users;
