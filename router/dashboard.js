const path = require('path');
const process = require('process');

const express = require('express')


const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/main', (req, res) => {
    let msg='';
    let alert='';
    if(process.env.welcome == 1){
        process.env.welcome = 0;
        msg = `${process.env.name} عزیز به سامانه رزرواسیون میواندار خوش آمدید!`;
        alert = 'success'
    }
    res.render(path.join(__dirname, '..', 'views', 'Dashboard.ejs'), {
        statusAlert: alert ,
        alert:msg,
        location: 'dashboard',
        user:{
            name:process.env.name,
            role:process.env.role
        }
    })
})



module.exports = { router }
