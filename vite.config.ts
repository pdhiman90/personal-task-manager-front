// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // ✅ Ensures proper routing on Vercel
  server: {
    port: 5173, // ✅ Ensures local development runs on port 5173
  },
  build: {
    outDir: 'dist', // ✅ Default output folder for Vercel deployment
  },
  resolve: {
    alias: {
      '@': '/src', // ✅ Enables path aliasing
    }
  }
});
