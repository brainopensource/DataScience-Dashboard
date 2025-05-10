declare const api: {
    window: {
        minimize: () => Promise<any>;
        maximize: () => Promise<any>;
        close: () => Promise<any>;
    };
    app: {
        quit: () => Promise<any>;
        relaunch: () => Promise<any>;
    };
    file: {
        open: () => Promise<any>;
        save: (path: string, content: string) => Promise<any>;
    };
    data: {
        fetch: (id: string) => Promise<any>;
        update: (id: string, data: any) => Promise<any>;
    };
};
declare global {
    interface Window {
        electron: typeof api;
    }
}
export {};
