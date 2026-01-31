import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

export default defineConfig({
  // 1. Base URL per GitHub Pages
  base: '/Guida_Interattiva_Procedura/',

  // 2. Punto di partenza: la cartella dove si trova il tuo index.html
  root: path.resolve(import.meta.dirname, "client"),

  plugins: [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    vitePluginManusRuntime()
  ],

  resolve: {
    alias: {
      // Puntiamo solo a quello che esiste sicuramente
      "@": path.resolve(import.meta.dirname, "client/src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },

  build: {
    // 3. Mettiamo il risultato finale nella cartella 'dist' nella root del progetto
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    
    // 4. Specifichiamo l'ingresso in modo esplicito
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "client/index.html"),
      },
    },
  },
});
