import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["umd"],
      name: "typed-toolkit",
      fileName: "index"
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies), /^node:.*/]
    },
    target: "esnext"
  },
  plugins: [dts()],
  resolve: { alias: { src: resolve("lib/") } }
});
