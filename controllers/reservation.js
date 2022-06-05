
const path = require('path');
const process = require('process');

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
    },
    address: {
        type: 'string',
        min: 1,
    },
    roomName: {
        type: 'string'
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

        let reservation = req.body;


        moment.locale('fa');
        let mIn = moment(req.body.enter, 'jYYYY/jM/jD');
        let mOut = moment(req.body.out, 'jYYYY/jM/jD');
        moment.locale('en');
        var date1 = new Date(mIn.format('YYYY/M/D'));
        var date2 = new Date(mOut.format('YYYY/M/D'));
        if ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24) < 0) {
            res.render(path.join(__dirname, '..', 'views', 'resForm.ejs'), {
                job: 'رزرو جدید',
                alert: 'تاریخ خروج نباید تاریخی قبل از تاریخ ورود باشد! ',
                statusAlert: 'error',
                rooms: roomslist,
                location: 'reservation',
                user: {
                    name: process.env.name,
                    role: process.env.role
                }
            })
        } else {
            
            try {
                let room = await Room.findOne({where:{name:reservation.roomName}})
                let totalPay =((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)+1) * room.cost;
                await Room.update({status:'در حال استفاده'},{ where:{name:reservation.roomName}})
                await Reservation.create({
                    firstName:reservation.fname.trim(),
                    lasttName:reservation.lname.trim(),
                    gender:reservation.gender.trim(),
                    nId:reservation.nid.trim(),
                    callNumber:reservation.phone.trim(),
                    address:reservation.address.trim(),
                    roomName:reservation.roomName.trim(),
                    enter:reservation.enter.trim(),
                    out:reservation.out.trim(),
                    pNum:reservation.pNum.trim(),
                    description:reservation.description.trim(),
                    totalPay
                })
            } catch (error) {
                console.log(error);
            }
            res.redirect('/reservation/main?job=add');
        }

    
    } else {
        if (validate.some((obj) => { return obj.type == 'stringMin' })) {
            res.render(path.join(__dirname, '..', 'views', 'resForm.ejs'), {
                job: 'رزرو جدید',
                alert: ' فیلدهای الزامی نباید خالی باشند! ',
                statusAlert: 'error',
                rooms: roomslist,
                location: 'reservation',
                user: {
                    name: process.env.name,
                    role: process.env.role
                }
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
        location: 'reservation',
        user: {
            name: process.env.name,
            role: process.env.role
        }
    })
}

const main = async (req, res) => {
    let alert = '';
    let statusAlert = '';
    if (req.query.job == 'add') {
        alert = ' رزرواسیون با موفقیت انجام شد!';
        statusAlert = 'success'
    }
    let reservation;
    try {
        reservation = await Reservation.findAll()
    } catch (error) {
        console.log(error);
    }
    let page = +req.query.page;
    if (!page) {
        page = 1;
    }
    pageCount = Math.ceil(reservation.length / 10);
    let reservationsOnPage = reservation.slice((0 + (10 * (page - 1))), (10 + (10 * (page - 1))))
    res.render(path.join(__dirname, '..', 'views', 'reservation.ejs'), {
        job: 'لیست رزروها',
        alert,
        statusAlert,
        location: 'reservation',
        user: {
            name: process.env.name,
            role: process.env.role
        },
        reservations: reservationsOnPage,
        page,
        pageCount
    })
}
const deleteUser = async (req, res) => {

}
const edit = async (req, res) => {

}
const editUser = async (req, res) => {

}


module.exports = {
    newRes,
    getForm,
    main,
    deleteUser,
    edit,
    editUser
}

