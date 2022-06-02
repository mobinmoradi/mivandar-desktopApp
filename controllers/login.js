const path = require('path');

const Validator = require("fastest-validator");
const bcrypt = require('bcryptjs');

const { User } = require('../models/user');
const { redirect } = require('express/lib/response');

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
    console.log(req.body);
    let validate
    try {
        const check = v.compile(schema);
        validate = check(req.body)

    } catch (error) {
        console.log(error);
    }
    console.log(validate);
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
    

    // if (validate !== true) {
    //     res.render("index", { messages: validate, userName: req.body.userName })
    // } else {
    //     (async () => {
    //         let user = await User.findOne({
    //             where: {
    //                 userName: req.body.userName
    //             }
    //         })
    //         if(!user) {
    //             const error = [{ type: 'failure', message: 'نام کاربری یا رمز عبور اشتباه می باشد!' }]
    //             res.render("index", { messages: error, userName: req.body.userName })
    //         } else {
    //             if (user.password === req.body.password) {
    //                 let messages = [{
    //                     type: 'Successful',
    //                     message: `${user.firstName} عزیز، شما با موفقیت وارد شدید!`
    //                 }]
    //                 res.render(path.join(__dirname, '..', 'views', 'Dashboard.ejs'), { messages, user })
    //             } else {
    //                 const error = [{ type: 'failure', message: 'نام کاربری یا رمز عبور اشتباه می باشد!' }]
    //                 res.render("index", { messages: error, userName: req.body.userName })
    //             }


    //         }
    //     })();
    // }
}



module.exports = {
    loginController
}