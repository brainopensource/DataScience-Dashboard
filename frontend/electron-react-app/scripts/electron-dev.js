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
    });
    await server.listen();
    console.log('Vite dev server started successfully!');

    // Use npx to run electron
    const electronProcess = spawn('npx', ['electron', '.'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        VITE_DEV_SERVER_URL: 'http://localhost:5173',
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