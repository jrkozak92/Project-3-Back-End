const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const cors = require('cors')
require('dotenv').config()
const charactersController = require('./controllers/characters.js')
const episodesController = require('./controllers/episodes.js')
const usersController = require('./controllers/users.js')
const session = require('express-session')
const sessionsController = require('./controllers/sessions.js')

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));

//Middleware
app.use(express.json())
app.use(cors())
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

//controllers/routing
app.use('/characters', charactersController)
app.use('/episodes', episodesController)
app.use('/users', usersController)
app.use('/sessions', sessionsController)

app.get('/', (req, res) => {
  res.redirect('/characters')
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
})
