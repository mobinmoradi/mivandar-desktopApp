const path = require('path');

const {app , BrowserWindow} =require('electron')

const server = require('./server');


app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 650,
    titleBarStyle: 'customButtonsOnHover',
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: true,
    minHeight:650,
    minWidth:1100,
    icon:path.join(__dirname,'public','img','icon.png')
  });
  mainWindow.loadURL('http://localhost:3000/');
  mainWindow.focus();
});


