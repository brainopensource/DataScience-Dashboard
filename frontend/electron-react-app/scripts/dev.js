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

    // Get the server URL and port
    const serverUrl = `http://localhost:${server.config.server.port}`;
    const networkUrl = `http://${server.config.server.host}:${server.config.server.port}`;

    console.log('\n🚀 Vite dev server started successfully!');
    console.log(`📡 Local:   ${serverUrl}`);
    console.log(`🌐 Network: ${networkUrl}`);
    console.log('\n📝 Press Ctrl+C to stop the server\n');

  } catch (error) {
    console.error('Failed to start dev server:', error);
    process.exit(1);
  }
}

startDevServer(); 