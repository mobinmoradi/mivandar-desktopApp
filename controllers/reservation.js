const path = require('path');

const Validator = require("fastest-validator");
let moment = require('jalali-moment');

const { Reservation } = require('../models/reservation');


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
        type: "string",
        custom: (v, errors) => {
            const re = "^[0-9]*$";
            if (v.search(re) == -1) errors.push({ type: "pay" })
            return v;
        }
    },
    payMethod: {
        type: "string",
        min: 1,
    }
};
const newRes = async (req, res) => {
    console.log(moment.from(req.body.enter, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'));
    let validate
    try {
        const check = v.compile(schema);
        validate = check(req.body)

    } catch (error) {
        console.log(error);
    }
    console.log(validate);

    res.render(path.join(__dirname, '..', 'views', 'resForm.ejs'), {
        job: 'رزرو جدید',
        alert: 'ok ',
        statusAlert: 'info'
    })
}


module.exports = {
    newRes
}