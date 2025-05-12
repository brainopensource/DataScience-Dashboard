interface ElectronAPI {
  window: {
    minimize: () => Promise<void>;
    maximize: () => Promise<void>;
    close: () => Promise<void>;
  };
  app: {
    quit: () => Promise<void>;
    relaunch: () => Promise<void>;
  };
  file: {
    open: () => Promise<string>;
    save: (path: string, content: string) => Promise<void>;
  };
  data: {
    fetch: (id: string) => Promise<any>;
    update: (id: string, data: any) => Promise<void>;
  };
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
