import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

/**
 * Configuracion de Vite para el proyecto con React
 * 
 * @returns {Object} Configuración de Vite
 * 
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  // Plugins del proyecto
  plugins: [
    react()   // Plugin de React para Vite, habilita JSX y Fast Refresh
  ],
  // Resolucion de modulos y alias
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
