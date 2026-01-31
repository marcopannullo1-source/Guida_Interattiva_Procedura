import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

export default defineConfig({
  // Il nome del tuo repository su GitHub
  base: '/Guida_Interattiva_Procedura/',

  // Diciamo a Vite che il progetto è dentro la cartella 'client'
  root: 'client',

  plugins: [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    vitePluginManusRuntime()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },

  build: {
    // Diciamo a Vite di uscire da 'client' e creare 'dist' nella cartella principale
    outDir: '../dist',
    emptyOutDir: true,
    // Poiché siamo già in 'root: client', l'ingresso è semplicemente index.html
    rollupOptions: {
      input: path.resolve(__dirname, "client/index.html"),
    },
  },
});
