const path = require('path');

const newRoom = async (req, res) => {
    console.log("roomController")
    res.render(path.join(__dirname, '..', 'views', 'roomForm.ejs'), {
        job: 'افزودن اتاق'
    })
}


module.exports ={
    newRoom
}