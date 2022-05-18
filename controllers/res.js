const path = require('path');

const newRes = async (req, res) => {
    console.log("resController")
    res.render(path.join(__dirname, '..', 'views', 'resForm.ejs'), {
        job: 'رزرو جدید'
    })
}


module.exports ={
    newRes
}