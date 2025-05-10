import { useCallback } from 'react';

export const useElectron = () => {
  const minimizeWindow = useCallback(() => {
    window.electron.window.minimize();
  }, []);

  const maximizeWindow = useCallback(() => {
    window.electron.window.maximize();
  }, []);

  const closeWindow = useCallback(() => {
    window.electron.window.close();
  }, []);

  const openFile = useCallback(async () => {
    return window.electron.file.open();
  }, []);

  const saveFile = useCallback(async (path: string, content: string) => {
    return window.electron.file.save(path, content);
  }, []);

  const fetchData = useCallback(async (id: string) => {
    return window.electron.data.fetch(id);
  }, []);

  const updateData = useCallback(async (id: string, data: any) => {
    return window.electron.data.update(id, data);
  }, []);

  return {
    window: {
      minimize: minimizeWindow,
      maximize: maximizeWindow,
      close: closeWindow,
    },
    file: {
      open: openFile,
      save: saveFile,
    },
    data: {
      fetch: fetchData,
      update: updateData,
    },
  };
}; 