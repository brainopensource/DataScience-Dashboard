import { contextBridge, ipcRenderer } from 'electron';
// Type-safe wrapper for IPC calls
const api = {
    window: {
        minimize: () => ipcRenderer.invoke('window:minimize'),
        maximize: () => ipcRenderer.invoke('window:maximize'),
        close: () => ipcRenderer.invoke('window:close'),
    },
    app: {
        quit: () => ipcRenderer.invoke('app:quit'),
        relaunch: () => ipcRenderer.invoke('app:relaunch'),
    },
    file: {
        open: () => ipcRenderer.invoke('file:open'),
        save: (path, content) => ipcRenderer.invoke('file:save', { path, content }),
    },
    data: {
        fetch: (id) => ipcRenderer.invoke('data:fetch', { id }),
        update: (id, data) => ipcRenderer.invoke('data:update', { id, data }),
    },
};
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', api);
