interface AppState {
    isAuthenticated: boolean;
    token: string | null;
    setAuth: (token: string | null) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}
export declare const useStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AppState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AppState, {
            theme: "light" | "dark";
            token: string | null;
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AppState) => void) => () => void;
        onFinishHydration: (fn: (state: AppState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AppState, {
            theme: "light" | "dark";
            token: string | null;
        }>>;
    };
}>;
export {};
