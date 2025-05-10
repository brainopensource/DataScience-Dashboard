const { createServer } = require('vite');
const { resolve } = require('path');

async function startDevServer() {
  try {
    const server = await createServer({
      configFile: resolve(__dirname, '../config/vite.config.ts'),
      mode: 'development',
    });
    await server.listen();
    console.log('Dev server started successfully!');
  } catch (error) {
    console.error('Failed to start dev server:', error);
    process.exit(1);
  }
}

startDevServer(); 