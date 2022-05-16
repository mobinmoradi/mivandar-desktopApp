const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const publicRoutes = require('./router/public.js');
const dashboardRoutes = require('./router/dashboard.js');
const uidev = require('./router/uidev.js');

const app = express()



// configs
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules', 'boxicons')))


//routs

//app.use('/', publicRoutes.router)
//
app.use('/test', uidev.router)
app.use('/public',publicRoutes.router)
app.use('/dashboard', dashboardRoutes.router)
app.on('/',(req,res)=>{
    res.redirect('/public/index');
})
app.listen(3000, () => {
    console.log("The server is running on port :3000!")
})
