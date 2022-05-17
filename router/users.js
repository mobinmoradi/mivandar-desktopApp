const path = require('path');

const express = require('express')


const userController =require('../controllers/users');

const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/new', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
        job: 'افزودن کاربر'
    })
})

router.post('/new', userController.newUser)





module.exports = { router }