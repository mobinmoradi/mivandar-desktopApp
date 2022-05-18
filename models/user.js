const { DataTypes } = require('sequelize');

const {sequelize} = require('../config/db');

const User = sequelize.define('User', {
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
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
    userName:{
     type:DataTypes.STRING,
     allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
   
});
(async () => {
    await sequelize.sync();
})();

module.exports = {User}



