const path = require('path');

const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    userName:{
        type:"string",
        min:1,
        messages:{
            stringMin:'نام کاربری الزامی است!'

        }
    },
    password:{
        type:"string",
        min:1,
        messages:{
            stringMin:'رمز عبور الزامی است!'
        }
    }
    
};



const loginController = (req, res) => {
    const validate = v.validate(req.body,schema)
console.log(validate)
    if(validate !== true){
        
        res.render("index",{errors: validate , userName: req.body.userName})
    }
    res.render(path.join(__dirname, '..', 'views', 'Dashboard.ejs'), { role: req.body.userName })
}



module.exports = {
    loginController
}