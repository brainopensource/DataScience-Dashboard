import { createServer } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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