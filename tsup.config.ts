import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["index.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  minify: !options.watch,
  sourcemap: !options.watch,
}));
