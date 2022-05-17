const path = require('path');

const bcrypt = require('bcryptjs');

const newUser = async (req, res) => {

    let user = req.body
    user.password = await bcrypt.hashSync(user.password , await bcrypt.genSaltSync(2));

    console.log(user)
    res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
        job: 'افزودن کاربر'
    })
}


module.exports ={
    newUser
}