import { defineConfig } from 'vite'

export default defineConfig ({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://212.56.40.235:5006',
        // target: 'http://212.56.40.235:5005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})