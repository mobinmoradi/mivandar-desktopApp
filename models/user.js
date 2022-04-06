const { DataTypes } = require('sequelize');

const {sequelize} = require('../config/db');

const User = sequelize.define('User', {
    firstName:{
        type:DataTypes.STRING
    },
    lasttName:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING
    },
    callNumber:{
        type:DataTypes.STRING
    },
    userName:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
});

module.exports.User = User



