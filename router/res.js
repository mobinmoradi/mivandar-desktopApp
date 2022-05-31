const path = require('path');

const express = require('express')


const resController =require('../controllers/res');

const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/new', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'resForm.ejs'), {
        job: 'رزرو جدید',job: 'افزودن کاربر',
        alert: '',
        statusAlert:''
    })
})

router.post('/new', resController.newRes)





module.exports = { router }