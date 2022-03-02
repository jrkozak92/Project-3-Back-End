const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const cors = require('cors')
require('dotenv').config()
const charactersController = require('./controllers/characters.js')

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));

//Middleware
app.use(express.json())
app.use(cors())

//controllers/routing

app.use('/characters', charactersController)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
})
