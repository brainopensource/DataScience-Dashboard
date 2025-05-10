import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, '../index.html'),
      },
    },
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '@components': resolve(__dirname, '../src/components'),
      '@pages': resolve(__dirname, '../src/pages'),
      '@hooks': resolve(__dirname, '../src/hooks'),
      '@utils': resolve(__dirname, '../src/utils'),
      '@services': resolve(__dirname, '../src/services'),
      '@store': resolve(__dirname, '../src/store'),
      '@styles': resolve(__dirname, '../src/styles'),
      '@assets': resolve(__dirname, '../src/assets'),
      '@types': resolve(__dirname, '../src/types'),
      '@config': resolve(__dirname, '../config'),
    },
  },
}); 