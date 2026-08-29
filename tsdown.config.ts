import { defineConfig } from "tsdown";

export default defineConfig((options) => {
  const watching = Boolean(options.watch);

  return {
    entry: ["index.ts"],
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    minify: !watching,
    sourcemap: !watching,
    attw: { level: "error" },
    publint: true,
  };
});
