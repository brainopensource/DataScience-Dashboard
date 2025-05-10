import { spawn } from 'child_process';
import { createServer } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startElectronDev() {
  try {
    // Start Vite dev server
    const server = await createServer({
      configFile: resolve(__dirname, '../config/vite.config.ts'),
      mode: 'development',
      server: {
        port: 5174, // Use a different port for Electron
      },
    });
    await server.listen();
    
    // Get the server URL and port
    const serverUrl = `http://localhost:${server.config.server.port}`;
    console.log('\n🚀 Electron dev server started successfully!');
    console.log(`📡 Server running at: ${serverUrl}`);
    console.log('📝 Press Ctrl+C to stop the server\n');

    // Use npx to run electron
    const electronProcess = spawn('npx', ['electron', '.'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        VITE_DEV_SERVER_URL: serverUrl,
      },
      shell: true, // Use shell to ensure proper execution on Windows
    });

    electronProcess.on('close', () => {
      server.close();
      process.exit();
    });

  } catch (error) {
    console.error('Failed to start Electron dev:', error);
    process.exit(1);
  }
}

startElectronDev(); 