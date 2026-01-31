import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // Il nome del tuo repository
  base: './',
  
  // La cartella dove si trova il tuo index.html
  root: 'client',

  build: {
    // Esci da 'client' e scrivi tutto in 'dist' nella root
    outDir: '../dist',
    emptyOutDir: true,
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  // Se avevi altri plugin (manus, tailwind), aggiungili qui sotto
  plugins: [react()],
});
