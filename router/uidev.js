const path = require('path');

const express = require('express')


const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/dashboard', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'Dashboard.ejs'))
})
/*
<%- include('./includes/head.ejs') -%>
<%- include('./includes/message.ejs')  -%> 
<header class="header">
    <div class="d-f logo1">
        <img height="40px"  src="img/icon.png">
        <h2 class=" text-logo">میواندار</h2>
    </div>
    <div class="d-f ">
        <div><%= user.firstName %> <%= user.lasttName %>  </div>
        <div> <a href="/">خروج</a></div>
    </div>
</header>
<h1> <%= user.role %>  Dashboard</h1>

<%- include('./includes/foot.ejs') -%>
*/
router.get('/reservation', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'reservation.ejs'))
})
router.get('/resform', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'resform.ejs'))
})



module.exports = {router}
