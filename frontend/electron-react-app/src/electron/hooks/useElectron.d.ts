export declare const useElectron: () => {
    window: {
        minimize: () => void;
        maximize: () => void;
        close: () => void;
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
