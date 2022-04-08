const path = require('path');

const Validator = require("fastest-validator");

const { User } = require('../models/user');

const v = new Validator();

const schema = {
    userName: {
        type: "string",
        min: 1,
        messages: {
            stringMin: 'نام کاربری الزامی است!'

        }
    },
    password: {
        type: "string",
        min: 1,
        messages: {
            stringMin: 'رمز عبور الزامی است!'
        }
    }

};



const loginController = (req, res) => {
    const validate = v.validate(req.body, schema)

    if (validate !== true) {
        res.render("index", { messages: validate, userName: req.body.userName })
    } else {
        (async () => {
            let user = await User.findOne({
                where: {
                    userName: req.body.userName
                }
            })
            if(!user){
                const error = [{type:'failure',  message: 'نام کاربری یا رمز عبور اشتباه می باشد!' }]
                res.render("index", { messages: error, userName: req.body.userName })
            }else{
                let  messages=[{
                    type:'Successful',
                    message:`${user.firstName} عزیز، شما با موفقیت وارد شدید!`
                }]
               res.render(path.join(__dirname, '..', 'views', 'Dashboard.ejs'), {messages, user }) 
            }
        })();
    }
}



module.exports = {
    loginController
}