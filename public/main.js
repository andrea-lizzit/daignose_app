const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const io = require( './io' );  
const isDev = require("electron-is-dev");
const diagnose = require("./diagnose")

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {nodeIntegration: true, contextIsolation: false}
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// return list of files
ipcMain.handle( 'app:get-files', () => {
  return io.getFiles();
} );

// listen to file(s) add event
ipcMain.handle( 'app:on-file-add', ( event, files = [] ) => {
  io.addFiles( files );
} );

// open filesystem dialog to choose files
ipcMain.handle( 'app:on-fs-dialog-open', ( event ) => {
  const files = dialog.showOpenDialogSync( {
      properties: [ 'openFile', 'multiSelections' ],
  } );

  io.addFiles( files.map( filepath => {
      return {
          name: path.parse( filepath ).base,
          path: filepath,
      };
  } ) );
} );

ipcMain.handle('app:diagnose-img', (event, file) => {
  diag = diagnose.diagnose(file);
  return diag;
});

/*-----*/

// listen to file delete event
ipcMain.on( 'app:on-file-delete', ( event, file ) => {
  io.deleteFile( file.filepath );
} );

// listen to file open event
ipcMain.on( 'app:on-file-open', ( event, file ) => {
  io.openFile( file.filepath );
} );

// listen to file copy event
ipcMain.on( 'app:on-file-copy', ( event, file ) => {
  event.sender.startDrag( {
      file: file.filepath,
      icon: path.resolve( __dirname, '../resources/paper.png' ),
  } );
} );