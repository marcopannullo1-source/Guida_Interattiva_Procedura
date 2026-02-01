import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: '/Guida_Interattiva_Procedura/',
  root: 'client',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Questo è vitale: dice a Vite di mettere i file dove GitHub li aspetta
    outDir: '../dist', 
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
