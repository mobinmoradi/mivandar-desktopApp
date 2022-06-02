const path = require('path');

const bcrypt = require('bcryptjs');
const Validator = require("fastest-validator");

const { Room } = require('../models/room');


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


//status
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
        try {

            console.log(room);
            await Room.create({
                name: room.name.trim(),
                description: room.description.trim(),
                type: room.type.trim(),
                cost: room.cost.trim()
            })
        } catch (error) {
            console.log(error);
        }
        res.render(path.join(__dirname, '..', 'views', 'roomForm.ejs'), {
            job: 'افزودن اتاق',
            alert: 'اطلاعات اتاق با موفقیت ثبت شد!',
            statusAlert: 'success',
            location: 'rooms'
        })
    } else {
        if (validate.some((obj) => { return obj.type == 'stringMin' })) {
            res.render(path.join(__dirname, '..', 'views', 'roomForm.ejs'), {
                job: 'افزودن کاربر',
                alert: ' فیلدهای الزامی نباید خالی باشند! ',
                statusAlert: 'error',
                location: 'rooms'
            })
        }
    }

}

const main = async (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'rooms.ejs'), {
        alert: '',
        statusAlert: '',
        location: 'rooms'
    })
}


module.exports = {
    newRoom,
    main
}