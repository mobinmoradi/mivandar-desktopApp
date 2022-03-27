const path =require('path');

// @desc get / 
exports.index = (req,res)=>{
    res.render(path.join(__dirname,'..','views','index.ejs'),{appTitle:'mivandar'})
}

// @desc get /about
exports.about = (req,res)=>{
    res.render(path.join(__dirname,'..','views','about.ejs'),{appTitle:'mivandar'})
}