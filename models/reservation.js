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
    roomId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    resType:{
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
    Paid:{
        type:DataTypes.NUMBER,
        allowNull:false,
        defaultValue:0
    },
    resStatus:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'در حال اقامت'
    },
    payStatus:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'بدون پرداخت'
    }

});

module.exports = {Reservation}