import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload/preload.js'),
      webSecurity: false // Allow loading local resources
    }
  });

  // Remove menu bar
  mainWindow.setMenu(null);

  // Load the app
  if (isDev) {
    // Try to load from Vite dev server
    const devUrl = 'http://localhost:5174';
    mainWindow.loadURL(devUrl).catch((err) => {
      console.error('Failed to load dev server:', err);
      // Fallback to local file if dev server is not available
      mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Handle window load errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
    if (isDev) {
      console.log('Attempting to reload from dev server...');
      mainWindow.loadURL('http://localhost:5174');
    }
  });

  // Add keyboard shortcut for DevTools in development
  if (isDev) {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.key.toLowerCase() === 'i') {
        mainWindow.webContents.toggleDevTools();
      }
    });
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
