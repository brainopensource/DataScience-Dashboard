import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload/preload.js')
    }
  });

  // Determine the correct URL based on environment
  const startUrl = process.env.VITE_DEV_SERVER_URL || 
    (app.isPackaged
      ? `file://${path.join(__dirname, '../dist/index.html')}`
      : 'http://localhost:5174'); // Updated to match electron-dev.js port

  console.log('Loading URL:', startUrl);
  console.log('Is Packaged:', app.isPackaged);
  console.log('__dirname:', __dirname);

  win.loadURL(startUrl);

  // Open DevTools in development
  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
