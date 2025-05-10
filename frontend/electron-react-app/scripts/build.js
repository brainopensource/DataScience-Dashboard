const { build } = require('vite');
const { resolve } = require('path');

async function buildApp() {
  try {
    await build({
      configFile: resolve(__dirname, '../config/vite.config.ts'),
      mode: 'production',
    });
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildApp(); 