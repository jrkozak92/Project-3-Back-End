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
const markersController = require('./controllers/markers.js')

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
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/')
  }
}

app.use('/markers', markersController)
app.use('/sessions', sessionsController)
app.use('/users', usersController)
// app.use("/:all", isAuthenticated)
app.use('/characters', charactersController)
app.use('/episodes', episodesController)


app.get('/', (req, res) => {
  res.json({})
})


app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
})
