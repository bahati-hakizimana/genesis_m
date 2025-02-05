import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer"; // For bundle analysis

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Automatically opens the stats report in your browser
      filename: "stats.html", // Generates the stats file
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split vendor (node_modules) code and app code
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Create a separate "vendor" chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000 KB
  },
});

