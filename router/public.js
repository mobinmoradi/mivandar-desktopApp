const path = require('path');

const express = require('express')

const login = require('../controllers/login');
const { User } = require('../models/user');
const { sequelize } = require('../config/db')


const router = express.Router()


router.get('/index', (req, res) => {
    let bg = Math.ceil(Math.random() * 10);
    res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
        bg,
        userName: "",
        alert: '',
        statusAlert: ''
    })
})

router.get('/about', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'about.ejs'), {
        alert: '',
        statusAlert: ''
    })
})

router.get('/about2', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'about.ejs'), {
        alert: 'برای ورود مجدد به سیستم مجددا login انجام دهید!',
        statusAlert: 'info'
    })
})
router.get('/logout',(req, res) => {
    let bg = Math.ceil(Math.random() * 10);
    res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
        bg,
        userName: "",
        alert: 'خروج از سیستم با موفقیت انجام شد!',
        statusAlert: 'success'
    })
})

router.post('/index', login.loginController)


module.exports = { router }


