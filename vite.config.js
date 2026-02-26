import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) {
            return 'react-core'
          }

          if (
            id.includes('/node_modules/react-router/') ||
            id.includes('/node_modules/react-router-dom/')
          ) {
            return 'router-vendor'
          }

          if (id.includes('@mui') || id.includes('@emotion')) {
            return 'mui-vendor'
          }

          if (id.includes('firebase')) {
            return 'firebase-vendor'
          }

          if (id.includes('framer-motion')) {
            return 'framer-vendor'
          }

          if (id.includes('@lottiefiles')) {
            return 'lottie-vendor'
          }

          if (id.includes('aos')) {
            return 'aos-vendor'
          }

          return 'vendor'
        },
      },
    },
  },
})
