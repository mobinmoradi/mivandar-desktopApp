const path = require('path');

const express = require('express')


const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'Dashboard.ejs'),{user:req.body})
})



module.exports = {router}
