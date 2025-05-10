export interface IpcChannels {
  // Window management
  'window:minimize': void;
  'window:maximize': void;
  'window:close': void;
  
  // App lifecycle
  'app:quit': void;
  'app:relaunch': void;
  
  // File operations
  'file:open': string;
  'file:save': { path: string; content: string };
  
  // Custom channels
  'data:fetch': { id: string };
  'data:update': { id: string; data: any };
}

export type IpcChannel = keyof IpcChannels;
export type IpcHandler<T extends IpcChannel> = (
  event: Electron.IpcMainInvokeEvent,
  ...args: any[]
) => Promise<IpcChannels[T]>; 