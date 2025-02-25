import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: "index.html",
        overlay: "src/overlay.html",
      },
      output: {
        entryFileNames: "overlay.bundle.js",
      },
    },
  },
})
