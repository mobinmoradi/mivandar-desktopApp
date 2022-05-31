const path = require('path');

const express = require('express')

const login = require('../controllers/login');
const {User} = require('../models/user');
const {sequelize} = require('../config/db')


const router = express.Router()


router.get('/index', (req, res) => {
    let bg = Math.ceil(Math.random() * 10);
    res.render(path.join(__dirname, '..', 'views', 'index.ejs'),{bg,userName:"",job: 'افزودن کاربر',
    alert: '',
    statusAlert:''})
})

router.get('/about', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'about.ejs'),{job: 'افزودن کاربر',
    alert: '',
    statusAlert:''})
})

router.post('/login',login.loginController)


module.exports = {router}


