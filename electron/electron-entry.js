const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadFile("index.html");
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
