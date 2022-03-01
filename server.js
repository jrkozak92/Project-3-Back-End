const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
require('dotenv').config()

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));

app.use(express.urlencoded())

app.listen(PORT, () => {
  console.log("listening on 3000...");
})

app.get('/', (req, res) => {
  res.send('Hello')
})
