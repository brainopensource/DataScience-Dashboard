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
      output: {
        manualChunks: {
          'plotly': ['plotly.js-dist-min'],
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled'
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the warning limit to 1000kb
  },
  server: {
    port: 5173,
    open: true, // Automatically open browser
    host: true, // Listen on all addresses
    strictPort: true, // Exit if port is in use
    hmr: {
      overlay: true, // Show errors as overlay
    },
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
  optimizeDeps: {
    include: ['plotly.js-dist-min'],
    exclude: ['electron'],
  },
  define: {
    'process.env': {},
    'global': 'globalThis',
  },
}); 