const path = require('path');

const express = require('express')

const login = require('../controllers/login');
const {User} = require('../models/user');
const {sequelize} = require('../config/db')


const router = express.Router()


router.get('/', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'index.ejs'),{messages:[],userName:""})
})
// define the about route
router.get('/about', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'about.ejs'))
})

router.post('/login',login.loginController)


router.get('/test',async(req,res)=>{
    await sequelize.sync();
    await User.create({
        firstName:"حبیب الله ",
        lasttName:"حبیبی",
        role:"admin",
        callNumber:"09181234567",
        userName:"user1",
        password:"12345"
    })
    await User.create({
        firstName:"بهداد",
        lasttName:"ساعدی",
        role:"maneger",
        callNumber:"09181234567",
        userName:"user2",
        password:"12345"
    })
    await User.create({
        firstName:"کیمیا",
        lasttName:"سیار",
        role:"clerk",
        callNumber:"09181234567",
        userName:"user3",
        password:"12345"
    })
    await User.create({
        firstName:"مبین",
        lasttName:"مرادی",
        role:"clerk",
        callNumber:"09181234567",
        userName:"user4",
        password:"12345"
    })

    res.redirect('/')
})


module.exports = {router}


