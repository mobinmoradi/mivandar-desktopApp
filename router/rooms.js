const path = require('path');

const express = require('express')


const roomController =require('../controllers/rooms');

const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/new', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'roomForm.ejs'), {
        job: 'افزودن اتاق',
        alert: '',
        statusAlert:'',
        location:'rooms'
    })
})

router.post('/new', roomController.newRoom)

router.get('/main',roomController.main)





module.exports = { router }