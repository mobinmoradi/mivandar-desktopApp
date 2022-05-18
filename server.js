const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const publicRoutes = require('./router/public.js');
const dashboardRoutes = require('./router/dashboard.js');
const usersRoutes = require('./router/users.js');
const roomsRoutes = require('./router/rooms.js');
const resRoutes = require('./router/res.js');


const app = express()



// configs
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules', 'boxicons')))


//routs
app.use('/public',publicRoutes.router)
app.use('/dashboard', dashboardRoutes.router)
app.use('/users',usersRoutes.router)
app.use('/rooms',roomsRoutes.router)
app.use('/res',resRoutes.router)


app.get('/',(req,res)=>{
    res.redirect('/public/index');
})
app.listen(3000, () => {
    console.log("The server is running on port: 3000")
})
