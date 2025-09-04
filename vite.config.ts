import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react()],
    build: {
      sourcemap: true
    },
    define: {
      'process.env': {
        ...process.env,
        ...env
      }
    },
    server: {
      port: 9990,
      open: false,
      proxy: {
        '/api': 'http://localhost:3000' // Vercel dev server (functions)
      }
    }
  };
});
