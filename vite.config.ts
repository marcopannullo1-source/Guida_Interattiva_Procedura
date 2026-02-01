import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: '/Guida_Interattiva_Procedura/',
  root: 'client',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      // Allineato a tsconfig.json e alla struttura reale delle cartelle
      "@": path.resolve(__dirname, "./client/src"), 
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
