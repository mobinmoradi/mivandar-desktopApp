const { DataTypes } = require('sequelize');

const {sequelize} = require('../config/db');

const Room = sequelize.define('Room', {
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'آماده تحویل'
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cost:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    description:{
     type:DataTypes.STRING
    }
});

module.exports = {Room}