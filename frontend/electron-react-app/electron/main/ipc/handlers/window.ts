import { BrowserWindow, ipcMain } from 'electron';
import { IpcHandler } from '../types';

export const registerWindowHandlers = (mainWindow: BrowserWindow) => {
  const handlers: Record<string, IpcHandler<any>> = {
    'window:minimize': async () => {
      mainWindow.minimize();
    },
    'window:maximize': async () => {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    },
    'window:close': async () => {
      mainWindow.close();
    },
  };

  // Register all handlers
  Object.entries(handlers).forEach(([channel, handler]) => {
    ipcMain.handle(channel, handler);
  });
}; 