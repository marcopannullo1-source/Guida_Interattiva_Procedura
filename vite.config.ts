import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

export default defineConfig({
  // Fondamentale per GitHub Pages
  base: '/Guida_Interattiva_Procedura/', 
  
  plugins: [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()],
  
  resolve: {
    alias: {
      // Punta alla cartella src che hai visto
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  
  // Diciamo a Vite che il file index.html si trova dentro 'client'
  root: path.resolve(import.meta.dirname, "client"),
  
  build: {
    // I file pronti per il web verranno creati qui
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
