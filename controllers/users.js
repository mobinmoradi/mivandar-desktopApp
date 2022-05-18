const path = require('path');

const bcrypt = require('bcryptjs');

const { User } = require('../models/user');
const newUser = async (req, res) => {
    let user = req.body
    user.password = await bcrypt.hashSync(user.password , await bcrypt.genSaltSync(2));
    console.log(user);
    try {  
        await User.create({
            firstName : user.fname ,
             lastName : user.lname, 
             role:user.role ,
             nId:user.nid ,
             callNumber:user.phone ,
             userName:user.userName ,
             password:user.password
         })
    } catch (error) {
        console.log(error);
    }

      
    res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
        job: 'افزودن کاربر'
    })
}


module.exports ={
    newUser
}