import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'maintenance-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.headers.host?.includes('vercel.app')
          ) {
            const fs = require('fs')
            const path = require('path')
            const html = fs.readFileSync(
              path.resolve(__dirname, 'public/maintenance.html'),
              'utf-8'
            )
            res.writeHead(503, { 'Content-Type': 'text/html' })
            res.end(html)
            return
          }
          next()
        })
      },
    },
    react(),
  ],
})
