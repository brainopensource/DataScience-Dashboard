import { contextBridge, ipcRenderer } from 'electron';
import { IpcChannels } from '../main/ipc/types';

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
    save: (path: string, content: string) => 
      ipcRenderer.invoke('file:save', { path, content }),
  },
  data: {
    fetch: (id: string) => ipcRenderer.invoke('data:fetch', { id }),
    update: (id: string, data: any) => 
      ipcRenderer.invoke('data:update', { id, data }),
  },
};

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', api);

// Type declaration for the window object
declare global {
  interface Window {
    electron: typeof api;
  }
} 