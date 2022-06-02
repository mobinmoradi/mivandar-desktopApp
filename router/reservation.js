const path = require('path');

const express = require('express')


const resController =require('../controllers/reservation');

const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/new', resController.getForm)

router.post('/new', resController.newRes)

router.get('/main',resController.main)




module.exports = { router }