const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seeds')


//Index:
baker.get('/', (req, res) => {
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

//Show
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
    .populate('breads')
    .then(foundBaker => {
        res.render('bakerShow', {
            baker: foundBaker
        })
    })
    .catch (err => {
        console.log(err)
        res.send('404')
    })
})

//delete route
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id)
        .then(deletedBaker => {
            res.status(303).redirect('/breads')
        })
})

baker.get('/data/seed', async (req, res) => {
    await Baker.deleteMany()
    Baker.insertMany(bakerSeedData).then(res.redirect('/breads'))
})

//export
module.exports = baker