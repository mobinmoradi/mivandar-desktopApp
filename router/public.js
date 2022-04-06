const path = require('path');

const express = require('express')


const router = express.Router()


router.get('/', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'index.ejs'), { appTitle: 'mivandar' })
})
// define the about route
router.get('/about', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'about.ejs'), { appTitle: 'mivandar' })
})

module.exports = router
