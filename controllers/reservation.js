const path = require('path');

const Validator = require("fastest-validator");
let moment = require('jalali-moment');

const { Reservation } = require('../models/reservation');
const { Room } = require('../models/room');


const v = new Validator({
    useNewCustomCheckerFunction: true,
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
    gender: {
        type: 'string',
        min: 1,
    },
    nid: {
        type: 'string',
        min: 2,
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
    address: {
        type: 'string',
        min: 1,
    },
    roomName: {
        type: 'string',
        min: 1,
    },
    resType: {
        type: 'string',
        min: 1,
    },
    enter: {
        type: "string",
        min: 1
    },
    out: {
        type: "string",
        min: 1
    },
    pNum: {
        type: "string",
        min: 1,
    },
    description: {
        type: "string",
    },
    totalPay: {
        type: "string",
    },
    Paid: {
        type: "string"
    },
    payMethod: {
        type: "string",
        min: 1,
    }
};

async function Roomlist() {
    let rooms;
    try {
        rooms = await Room.findAll({ attributes: ['name'] })
    } catch (error) {
        console.log(error);
    }
    let roomsName = rooms.map((value) => {
        return value.dataValues.name
    })
    return roomsName
}

const newRes = async (req, res) => {
    let roomslist = await Roomlist();
    let validate
    try {
        const check = v.compile(schema);
        validate = check(req.body)

    } catch (error) {
        console.log(error);
    }
    console.log(validate);


    if (validate === true) {
        let reserve = req.body;
        let roomExist;
        try {
            roomExist = await Room.findOne({ where: { name: reserve.roomName.trim() } })
        } catch (error) {
            console.log(error);
        }
        if (!roomExist) {
            res.render(path.join(__dirname, '..', 'views', 'resForm.ejs'), {
                job: 'رزرو جدید',
                alert: 'اتاقی با این نام ثبت نشده است!',
                statusAlert: 'error',
                rooms: roomslist,
                location:'reservation'
            })
        }

        res.render(path.join(__dirname, '..', 'views', 'resForm.ejs'), {
            job: 'رزرو جدید',
            alert: 'ok ',
            statusAlert: 'info',
            rooms: roomslist,
            location:'reservation'
        })
    } else {
        if (validate.some((obj) => { return obj.type == 'stringMin' })) {
            res.render(path.join(__dirname, '..', 'views', 'resForm.ejs'), {
                job: 'رزرو جدید',
                alert: ' فیلدهای الزامی نباید خالی باشند! ',
                statusAlert: 'error',
                rooms: roomslist,
                location:'reservation'
            })
        }
    }


}

const getForm = async (req, res) => {
    let roomslist = await Roomlist();
    res.render(path.join(__dirname, '..', 'views', 'resForm.ejs'), {
        job: 'رزرو جدید',
        alert: '',
        statusAlert: '',
        rooms: roomslist,
        location:'reservation'
    })
}

const main = async (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'reservation.ejs'), {
        alert: '',
        statusAlert: '',
        location:'reservation'
    })
}


module.exports = {
    newRes,
    getForm,
    main
}