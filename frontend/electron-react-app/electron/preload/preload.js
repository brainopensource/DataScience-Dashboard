import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  file: {
    open: () => ipcRenderer.invoke('file-open'),
    save: (path, content) => ipcRenderer.invoke('file-save', path, content),
  },
  data: {
    fetch: (id) => ipcRenderer.invoke('data-fetch', id),
    update: (id, data) => ipcRenderer.invoke('data-update', id, data),
  }
}); 