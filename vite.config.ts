import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Aggiunto per Tailwind 4
import path from "path";

export default defineConfig({
  base: '/Guida_Interattiva_Procedura/',
  root: 'client',
  plugins: [
    react(),
    tailwindcss(), // Attivazione Tailwind 4
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      // Coerente con tsconfig.json e la tua struttura src
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
