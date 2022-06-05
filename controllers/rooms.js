
const path = require('path');
const process = require('process');

const Validator = require("fastest-validator");

const { Room } = require('../models/room');
const { redirect } = require('express/lib/response');


const v = new Validator();
const schema = {
    name: {
        type: 'string',
        min: 1,
    },
    description: {
        type: 'string',
        min: 1,
    },
    type: {
        type: 'string',
        min: 1,
    },
    cost: {
        type: 'string',
        min: 1,
        custom: (v, errors) => {
            const re = "^[0-9]*$";
            if (v.search(re) == -1) errors.push({ type: "cost" })
            return v;
        }
    }
};

const newRoom = async (req, res) => {
    let validate
    try {
        const check = v.compile(schema);
        validate = check(req.body)
    } catch (error) {
        console.log(error);
    }
    console.log(validate);
    if (validate === true) {
        let room = req.body;
        let existroom;
        try {
            existroom = await Room.findOne({ where: { name: room.name.trim() } })
        } catch (error) {
            console.log(error);
        }
        if (existroom) {
            res.render(path.join(__dirname, '..', 'views', 'roomForm.ejs'), {
                job: 'افزودن اتاق',
                alert: 'قبلا اتاقی با این نام ثبت شده است',
                statusAlert: 'error',
                location: 'rooms',
                user: {
                    name: process.env.name,
                    role: process.env.role
                }
            })
        } else {
            try {
                await Room.create({
                    name: room.name.trim(),
                    description: room.description.trim(),
                    type: room.type.trim(),
                    cost: room.cost.trim()
                })
            } catch (error) {
                console.log(error);
            }
            let rooms;
            try {
                rooms = await Room.findAll();
            } catch (error) {
                console.log(error);
            }
            res.redirect('/rooms/main?job=add');
        }
    } else {
        if (validate.some((obj) => { return obj.type == 'stringMin' })) {
            res.render(path.join(__dirname, '..', 'views', 'roomForm.ejs'), {
                job: 'افزودن اتاق',
                alert: ' فیلدهای الزامی نباید خالی باشند! ',
                statusAlert: 'error',
                location: 'rooms',
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
        alert = 'افزودن اتاق با موفقیت انجام شد!';
        statusAlert = 'success'
    }
    if (req.query.job == 'delete') {
        alert = 'حذف اتاق با موفقیت انجام شد';
        statusAlert = 'success'
    }
    if (req.query.job == 'edit') {
        alert = 'ویرایش اتاق با موفقیت انجام شد';
        statusAlert = 'success'
    }
    let page = +req.query.page;
    if (!page) {
        page = 1;
    }
    let rooms;
    try {
        rooms = await Room.findAll();
    } catch (error) {
        console.log(error);
    }
    pageCount = Math.ceil(rooms.length / 10);
    let roomsOnPage = rooms.slice((0 + (10 * (page - 1))), (10 + (10 * (page - 1))))
    res.render(path.join(__dirname, '..', 'views', 'rooms.ejs'), {
        job: 'لیست اتاق ها',
        alert,
        statusAlert,
        location: 'rooms',
        user: {
            name: process.env.name,
            role: process.env.role
        },
        rooms: roomsOnPage,
        page,
        pageCount
    })
}

const deleteRoom = async (req, res) => {
    try {
        await Room.destroy({ where: { id: req.query.id } })
    } catch (error) {
        console.log(error);
    }
    res.redirect('/rooms/main?job=delete')
}

const edit = async (req, res) => {
    let roomE;
    try {
        roomE = await Room.findOne({ where: { id: req.query.id } })
    } catch (error) {
        console.log(error);
    }
    res.render(path.join(__dirname, '..', 'views', 'roomEditForm.ejs'), {
        job: 'ویرایش اتاق',
        alert: '',
        statusAlert: '',
        location: 'rooms',
        user: {
            name: process.env.name,
            role: process.env.role
        },
        roomE,
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

    if (validate === true) {
        let room = req.body;
        try {
            await Room.update({
                description: room.description.trim(),
                type: room.type.trim(),
                cost: room.cost.trim()
            }, {
                where: {
                    name: room.name
                }
            });
            res.redirect('/rooms/main?job=edit')

        } catch (error) {
            console.log(error);
        }
    } else {
        let roomE;
        try {
            roomE = await Room.findOne({ where: { id: req.query.id } })
        } catch (error) {
            console.log(error);
        }
        if (validate.some((obj) => { return obj.type == 'stringMin' })) {
            res.render(path.join(__dirname, '..', 'views', 'roomEditForm.ejs'), {
                job: 'ویرایش اتاق',
                alert: ' فیلدهای الزامی نباید خالی باشند! ',
                statusAlert: 'error',
                location: 'rooms',
                user: {
                    name: process.env.name,
                    role: process.env.role
                },
                roomE

            })
        }
    }
}




module.exports = {
    newRoom,
    main,
    deleteRoom,
    edit,
    editUser
}
