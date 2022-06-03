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
    process.env.name = '';
    process.env.role ='';
    process.env.welcome = true;
    res.render(path.join(__dirname, '..', 'views', 'about.ejs'), {
        alert: 'برای ورود مجدد به سیستم مجددا login انجام دهید!',
        statusAlert: 'info'
    })
})
router.get('/logout', (req, res) => {
    process.env.name = '';
    process.env.role ='';
    process.env.welcome = true;
    let bg = Math.ceil(Math.random() * 10);
    res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
        bg,
        userName: "",
        alert: 'خروج از سیستم با موفقیت انجام شد!',
        statusAlert: 'success'
    })
})

router.post('/index', login.loginController)

const bcrypt = require('bcryptjs');
router.get('/db', async (req, res) => {
    try {
        let password1 = await bcrypt.hashSync('mobin1', await bcrypt.genSaltSync(2));
        await User.create({
            firstName: 'مبین',
            lastName: 'مرادی',
            role: 'مهماندار',
            nId: '3720916634',
            callNumber: '09035687570',
            userName: 'mobin1',
            password: password1
        })
        let password2 = await bcrypt.hashSync('kimia1', await bcrypt.genSaltSync(2));
        await User.create({
            firstName: 'کیمیا',
            lastName: 'سیار',
            role: 'ادمین پشتیبان',
            nId: '3720000000',
            callNumber: '09000000000',
            userName: 'kimia1',
            password: password2
        })
        let password3 = await bcrypt.hashSync('behdad1', await bcrypt.genSaltSync(2));
        await User.create({
            firstName: 'بهداد',
            lastName: 'ساعدی',
            role: 'مدیر',
            nId: '3820000000',
            callNumber: '09000000000',
            userName: 'behdad1',
            password: password3
        })


    } catch (error) {
        console.log(error);
    }
})

module.exports = { router }


