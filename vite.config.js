import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['sb-6jpicmn9wpsx.vercel.run', 'localhost', '127.0.0.1'],
  },
})
