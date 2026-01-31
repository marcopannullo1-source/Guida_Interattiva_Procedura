import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

export default defineConfig({
  // Base corretta per GitHub Pages
  base: '/Guida_Interattiva_Procedura/',

  // Vite deve "vivere" dentro la cartella client
  root: path.resolve(__dirname, "client"),
  
  // Ma deve "sputare" i file fuori, nella cartella dist della root
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    // Questo assicura che l'index.html venga trattato come file principale
    rollupOptions: {
      input: path.resolve(__dirname, "client/index.html"),
    },
  },

  plugins: [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    vitePluginManusRuntime()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
