const path = require('path');
const process = require('process');

const Validator = require("fastest-validator");
const bcrypt = require('bcryptjs');

const { User } = require('../models/user');

const v = new Validator();

const schema = {
    userName: {
        type: "string",
        min: 1
    },
    password: {
        type: "string",
        min: 1
    },
    bg:{
        type: "string",
        min: 1 
    }
};



const loginController = async (req, res) => {
    let bg = Math.ceil(Math.random() * 10);
    let validate
    try {
        const check = v.compile(schema);
        validate = check(req.body)

    } catch (error) {
        console.log(error);
    }
    if (validate === true) {
        let user;
        try {
            user = await User.findOne({where: {userName: req.body.userName}})
        } catch (error) {
            console.log(error);
        }
        if (user) {
            const matchPass = await bcrypt.compare(req.body.password, user.password);
            if (matchPass) {
                process.env.name = `${user.firstName} ${user.lastName}`;
                process.env.role = user.role;
                process.env.welcome = 1;
                res.redirect('/dashboard/main');
            } else {
                res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
                    bg: req.body.bg,
                    userName: req.body.userName,
                    job: '',
                    alert: 'نام کاربری یا رمز عبور اشتباه میباشد!',
                    statusAlert: 'error'
                })
            }
        } else {
            res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
                bg: req.body.bg,
                userName: req.body.userName, 
                job: '',
                alert: 'نام کاربری یا رمز عبور اشتباه میباشد!',
                statusAlert: 'error'
            })
        }  
    } else {
        res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
            bg: req.body.bg,
            userName: req.body.userName, 
            job: '',
            alert: 'فیلدهای الزامی نباید خالی باشند! ',
            statusAlert: 'error'
        })
    }
    

}



module.exports = {
    loginController
}