import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Base deve corrispondere al nome del tuo repository su GitHub
  base: '/Guida_Interattiva_Procedura/',
  
  root: 'client', // Vite entrerà nella cartella client
  build: {
    // Dato che la root è 'client', l'output deve uscire di un livello per andare in 'dist'
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
