const { DataTypes } = require('sequelize');

const {sequelize} = require('../config/db');

const Reservation = sequelize.define('Reservation', {
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lasttName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    callNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
     type:DataTypes.STRING,
     allowNull:false
    },
    roomName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    enter:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    out:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    pNum:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING
    },
    totalPay:{
     type:DataTypes.NUMBER,
     allowNull:false
    },
    resStatus:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'در حال اقامت'
    }

});

module.exports = {Reservation}
