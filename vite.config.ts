import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(decodeURIComponent(__filename))

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['tests/*.test.ts']
  }
})
