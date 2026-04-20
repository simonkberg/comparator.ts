import { defineConfig } from "tsdown";

export default defineConfig((options) => ({
  entry: ["index.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  minify: !options.watch,
  sourcemap: !options.watch,
  outExtensions: ({ format }) =>
    format === "es"
      ? { js: ".js", dts: ".d.ts" }
      : { js: ".cjs", dts: ".d.cts" },
}));
