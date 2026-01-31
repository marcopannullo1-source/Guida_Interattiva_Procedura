import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

export default defineConfig({
  base: '/Guida_Interattiva_Procedura/',
  
  // Dove si trova il file index.html
  root: path.resolve(__dirname, "client"),
  
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

  build: {
    // Esce dalla cartella client e crea 'dist' nella root
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    // Forza Vite a usare index.html come ingresso
    rollupOptions: {
      input: path.resolve(__dirname, "client/index.html"),
    },
  },
});
