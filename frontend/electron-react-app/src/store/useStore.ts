import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Auth state
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (token: string | null) => void;
  
  // UI state
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Loading state
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth state
      isAuthenticated: false,
      token: null,
      setAuth: (token) => set({ 
        isAuthenticated: !!token,
        token 
      }),

      // UI state
      theme: 'light',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),

      // Loading state
      isLoading: false,
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'app-storage', // unique name for localStorage
      partialize: (state) => ({ 
        theme: state.theme,
        token: state.token,
      }), // only persist these fields
    }
  )
); 