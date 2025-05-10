import { ipcMain } from 'electron';
export const registerWindowHandlers = (mainWindow) => {
    const handlers = {
        'window:minimize': async () => {
            mainWindow.minimize();
        },
        'window:maximize': async () => {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize();
            }
            else {
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
