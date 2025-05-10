export interface IpcChannels {
    'window:minimize': void;
    'window:maximize': void;
    'window:close': void;
    'app:quit': void;
    'app:relaunch': void;
    'file:open': string;
    'file:save': {
        path: string;
        content: string;
    };
    'data:fetch': {
        id: string;
    };
    'data:update': {
        id: string;
        data: any;
    };
}
export type IpcChannel = keyof IpcChannels;
export type IpcHandler<T extends IpcChannel> = (event: Electron.IpcMainInvokeEvent, ...args: any[]) => Promise<IpcChannels[T]>;
