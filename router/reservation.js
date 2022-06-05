const express = require('express')


const resController =require('../controllers/reservation');

const router = express.Router()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/new', resController.getForm)

router.post('/new', resController.newRes)

router.get('/main',resController.main)

router.get('/deleteRoom',resController.deleteUser)

router.get('/edit',resController.edit)

router.post('/edit',resController.editUser)




module.exports = { router }