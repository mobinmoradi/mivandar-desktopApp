const path = require('path');

const {app , BrowserWindow} =require('electron')

const server = require('./server');


app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 750,
    height: 550,
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: true,
    icon:path.join(__dirname,'public','img','icon.png')
  });
  mainWindow.loadURL('http://localhost:3000/');
  mainWindow.focus();
});
