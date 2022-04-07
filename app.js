const path = require('path');

const {app , BrowserWindow} =require('electron')

const server = require('./server');


app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: true,
    minHeight:600,
    minWidth:1000,
    icon:path.join(__dirname,'public','img','icon.png')
  });
  mainWindow.loadURL('http://localhost:3000/');
  mainWindow.focus();
});


