import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9990,
    open: true,
    proxy: {
      '/api': 'http://localhost:3000' // Vercel dev server (functions)
    }
  }
})
