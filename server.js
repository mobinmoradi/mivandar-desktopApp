const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const app = express()


// configs
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname,'public')))



//routs
app.get('/',(req,res)=>{
    res.render('index.ejs',{appTitle: "mivandar" })
})



app.listen(3000,()=>{
    console.log("server is running on port 3000!")
})
