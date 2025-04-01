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
        popup: "src/popup/index.html",
        overlay: "src/overlay/overlay.html"
      },
      output: {
        // Name the bundles so you can refer to them in your manifest and content script
        entryFileNames: "[name].bundle.js"
      }
    }
  },
  server: {
    open: "/src/popup/index.html" // Change this to overlay.html
  }
})
