const path = require('path');

const bcrypt = require('bcryptjs');
const Validator = require("fastest-validator");

const { User } = require('../models/user');


const v = new Validator({
    useNewCustomCheckerFunction: true,
    messages: {
        equalField: ' رمز عبور با تکرار آن برابر نیست! ',
        userName: 'برای نام کاربری باید از حروف انگلیسی و اعداد و نشانه زیر خط "_" استفاده شود!',
        phone: 'تلفن تماس فقط مقادیر عددی را می پذیرد!'
    }
});
const schema = {
    fname: {
        type: 'string',
        min: 1,
    },
    lname: {
        type: 'string',
        min: 1,
    },
    role: {
        type: 'string',
        min: 1,
    },
    nid: {
        type: 'string',
        min: 1,
    },
    phone: {
        type: 'string',
        min: 1,
        custom: (v, errors) => {
            const re = "^[0-9]*$";
            if (v.search(re) == -1) errors.push({ type: "phone" })
            return v;
        }
    },
    userName: {
        type: "string",
        min: 1,
        custom: (v, errors) => {
            const re1 = "^[a-zA-Z0-9_]*$";
            if (v.search(re1) == -1) errors.push({ type: "userName" })
            return v;
        }
    },
    password: {
        type: "string",
        min: 6,
    },
    passwordre: {
        type: 'string',
        type: "equal",
        field: "password",
    },
};


const newUser = async (req, res) => {
    let validate
    try {
        const check = v.compile(schema);
        validate = check(req.body)
    } catch (error) {
        console.log(error);
    }
    console.log(validate);

    if (validate === true) {
        let user = req.body;
        let existUser;
        try {
            existUser = await User.findOne({ where: { userName: user.userName.trim() } })
        } catch (error) {
            console.log(error);
        }

        if (existUser) {
            res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
                job: 'افزودن کاربر',
                alert: 'کاربر دیگری با این نام کاربری وجود دارد!',
                statusAlert: 'error',
                location: 'users',
                user: {
                    name: process.env.name,
                    role: process.env.role
                }
            })
        } else {
            user.password = await bcrypt.hashSync(user.password, await bcrypt.genSaltSync(2));
            try {

                console.log(user);
                await User.create({
                    firstName: user.fname.trim(),
                    lastName: user.lname.trim(),
                    role: user.role.trim(),
                    nId: user.nid.trim(),
                    callNumber: user.phone.trim(),
                    userName: user.userName.trim(),
                    password: user.password.trim()
                })
            } catch (error) {
                console.log(error);
            }
            res.redirect('/users/main?job=add')
        }

    } else {

        if (validate.some((obj) => { return obj.type == 'stringMin' }) && validate.some((obj) => { return obj.field != 'password' })) {
            res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
                job: 'افزودن کاربر',
                alert: ' فیلدهای الزامی نباید خالی باشند! ',
                statusAlert: 'error',
                location: 'users',
                user: {
                    name: process.env.name,
                    role: process.env.role
                }
            })
        }
        if (validate.some((obj) => { return obj.type == 'userName' })) {
            res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
                job: 'افزودن کاربر',
                alert: 'برای نام کاربری باید از حروف انگلیسی و اعداد و نشانه زیر خط "_" استفاده شود!',
                statusAlert: 'error',
                location: 'users',
                user: {
                    name: process.env.name,
                    role: process.env.role
                }
            })
        }
        if (validate.some((obj) => { return obj.type == 'stringMin' }) && validate.some((obj) => { return obj.field == 'password' })) {
            res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
                job: 'افزودن کاربر',
                alert: ' رمز عبور باید بیشتر یا مساوی از 6 کاراکتر باشد ',
                statusAlert: 'error',
                location: 'users',
                user: {
                    name: process.env.name,
                    role: process.env.role
                }
            })
        }



        if (validate.some((obj) => { return obj.type == 'equalField' })) {
            res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
                job: 'افزودن کاربر',
                alert: ' رمز عبور با تکرار آن برابر نیست! ',
                statusAlert: 'error',
                location: 'users',
                user: {
                    name: process.env.name,
                    role: process.env.role
                }
            })
        }

        if (validate.some((obj) => { return obj.type == 'phone' })) {
            res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
                job: 'افزودن کاربر',
                alert: 'شماره تماس فقط مقادیر عددی را می پذیرد!',
                statusAlert: 'error',
                location: 'users',
                user: {
                    name: process.env.name,
                    role: process.env.role
                }
            })
        }
    }
}

const main = async (req, res) => {
    let alert = '';
    let statusAlert = '';
    if (req.query.job == 'add') {
        alert = 'افزودن کاربر با موفقیت انجام شد!';
        statusAlert = 'success'
    }
    if (req.query.job == 'delete') {
        alert = 'حذف کاربر با موفقیت انجام شد';
        statusAlert = 'success'
    }
    if (req.query.job == 'edit') {
        alert = 'ویرایش کاربر با موفقیت انجام شد';
        statusAlert = 'success'
    }
    let page = +req.query.page;
    if (!page) {
        page = 1;
    }
    let users;
    try {
        users = await User.findAll({
            attributes: { exclude: ['password'] }
        })
    } catch (error) {
        console.log(error);
    }
    pageCount = Math.ceil(users.length / 10);
    let usersOnPage = users.slice((0 + (10 * (page - 1))), (10 + (10 * (page - 1))))
    res.render(path.join(__dirname, '..', 'views', 'users.ejs'), {
        job: 'لیست کاربران',
        alert,
        statusAlert,
        location: 'users',
        user: {
            name: process.env.name,
            role: process.env.role
        },
        users: usersOnPage,
        page,
        pageCount
    })
}

const deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.query.id } })
    } catch (error) {
        console.log(error);
    }
    res.redirect('/users/main?job=delete')
}


const edit = async (req, res) => {
    let userE;
    try {
        userE = await User.findOne({ where: { id: req.query.id } })
    } catch (error) {
        console.log(error);
    }
    res.render(path.join(__dirname, '..', 'views', 'userEditForm.ejs'), {
        job: 'ویرایش کاربر',
        alert: '',
        statusAlert: '',
        location: 'users',
        user: {
            name: process.env.name,
            role: process.env.role
        },
        userE,
    })
}

const editUser = async (req, res) => {

    let validate
    try {
        const check = await v.compile(schema);
        validate = await check(req.body)
    } catch (error) {
        console.log(error);
    }
    console.log(validate);
    if (validate === true) {
        let user = req.body;
        try {
            user.password = await bcrypt.hashSync(user.password, await bcrypt.genSaltSync(2));
            await User.update({
                firstName: user.fname.trim(),
                lastName: user.lname.trim(),
                role: user.role.trim(),
                nId: user.nid.trim(),
                callNumber: user.phone.trim(),
                password: user.password.trim()
            }, {
                where: {
                    userName: user.userName
                }
            });
        } catch (error) {
            console.log(error);
        }
        res.redirect('/users/main?job=edit')

    } else {
        let userE;
        try {
            userE = await User.findOne({ where: { userName: user.userName } })
        } catch (error) {
            console.log(error);
        }
        if (validate.some((obj) => { return obj.type == 'stringMin' }) && validate.some((obj) => { return obj.field != 'password' })) {
            res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
                job: 'ویرایش کاربر',
                alert: ' فیلدهای الزامی نباید خالی باشند! ',
                statusAlert: 'error',
                location: 'users',
                user: {
                    name: process.env.name,
                    role: process.env.role
                },
                userE
            })
        }
        if (validate.some((obj) => { return obj.type == 'stringMin' }) && validate.some((obj) => { return obj.field == 'password' })) {
            res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
                job: 'ویرایش کاربر',
                alert: ' رمز عبور باید بیشتر یا مساوی از 6 کاراکتر باشد ',
                statusAlert: 'error',
                location: 'users',
                user: {
                    name: process.env.name,
                    role: process.env.role
                },
                userE
            })
        }
        if (validate.some((obj) => { return obj.type == 'equalField' })) {
            res.render(path.join(__dirname, '..', 'views', 'userForm.ejs'), {
                job: 'ویرایش کاربر',
                alert: ' رمز عبور با تکرار آن برابر نیست! ',
                statusAlert: 'error',
                location: 'users',
                user: {
                    name: process.env.name,
                    role: process.env.role
                },
                userE
            })
        }
    }

}

module.exports = {
    newUser,
    main,
    deleteUser,
    edit,
    editUser
}