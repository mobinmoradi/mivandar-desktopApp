const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const publicRoutes = require('./router/public.js');


const app = express()



// configs
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules', 'boxicons')))



//routs
app.use('/', publicRoutes)


app.listen(3000, () => {
    console.log("server is running on port: 3000!")
})
