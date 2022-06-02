const path = require('path');

const express = require('express')


const userController =require('../controllers/users');
const Swal = require('sweetalert2')
const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/new', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
        job: 'افزودن کاربر',
        alert: '',
        statusAlert:'',
        location: 'users'
    })
})

router.post('/new', userController.newUser)

router.get('/main',userController.main)





module.exports = { router }