import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import seoPrerender from './scripts/seo-prerender.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    seoPrerender(),
  ],
  build: {
    rollupOptions: {
      output: {
        // long-lived, separately cached vendor chunks
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          motion: ['gsap', '@gsap/react', 'lenis', 'framer-motion'],
        },
      },
    },
  },
})
