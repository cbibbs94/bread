// DEPENDENCIES
const express = require('express')
const req = require('express/lib/request')
const {get} = require('express/lib/response')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => { console.log('Oh Snap! We got that exclusive intel!! Its at:', process.env.MONGO_URI )})

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})
  
// Breads
  const breadsController = require('./controllers/breads_controller.js')
  app.use('/breads', breadsController)
  
  //Bakers 
  const bakersController = require('./controllers/bakers_controllers.js')
  app.use('/bakers', bakersController)
  
  app.get('*', (req, res) => {
    res.send('404')
  })


  // LISTEN
app.listen(PORT, () => {
  console.log('nomming at port', PORT);
})