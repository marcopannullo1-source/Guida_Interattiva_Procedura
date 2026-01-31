import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: '/Guida_Interattiva_Procedura/',
  root: 'client',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      // Dato che i file sono direttamente in client, @ deve puntare a ./
      "@": path.resolve(__dirname, "./client"), 
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
