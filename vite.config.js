import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 5173,
  },
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      external: ["pdfjs-dist/build/pdf.worker.min.js"],
      output: {
        globals: {
          "pdfjs-dist/build/pdf.worker.min.js": "pdfjsWorker",
        },
      },
    },
  },
});
