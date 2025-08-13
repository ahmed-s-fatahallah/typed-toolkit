import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es", "cjs"],
      name: "typed-toolkit",
      fileName: (format, entryName) => {
        if (entryName === "src/lib/index") {
          return `index.${format === "es" ? "js" : "cjs"}`;
        }
        return `${entryName}.${format === "es" ? "js" : "cjs"}`;
      }
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies), /^node:.*/],
      output: {
        preserveModules: true
      }
    },
    target: "esnext"
  },
  plugins: [dts()],
  resolve: { alias: { src: resolve("lib/") } }
});
