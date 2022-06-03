const path = require('path');
const process = require('process');

const express = require('express')


const roomController =require('../controllers/rooms');

const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/new', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'roomForm.ejs'), {
        job: 'افزودن اتاق',
        alert: '',
        statusAlert:'',
        location:'rooms',
        user:{
            name:process.env.name,
            role:process.env.role
        }
    })
})

router.post('/new', roomController.newRoom)

router.get('/main',roomController.main)





module.exports = { router }