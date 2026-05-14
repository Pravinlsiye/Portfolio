import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import unocss from "unocss/vite";

export default defineConfig({
  plugins: [unocss(), solid()],
  base: "./",
  build: {
    target: "esnext",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
        },
      },
    },
  },
});
