const path = require('path');

const express = require('express')


const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/main', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'Dashboard.ejs'),{
        statusAlert:'success',
        alert:'کاربر خوش آمدی',
        location:'dashboard'
    })
})



module.exports = {router}
