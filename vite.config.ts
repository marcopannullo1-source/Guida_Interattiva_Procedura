import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Usiamo il nome del repo per sicurezza estrema
  base: '/Guida_Interattiva_Procedura/',
  
  root: path.resolve(__dirname, 'client'), // Usa il percorso assoluto
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Forza l'uscita in dist alla radice
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'client/index.html'),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
